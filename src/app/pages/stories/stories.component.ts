import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../services/stories.service';
import { singleStory } from 'src/app/interfaces/stories-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit, OnDestroy {
  storiesGroups: singleStory[][] = [];
  subscription: Subscription;
  week: string;
  isLoading: boolean;
  currentPage: number;
  adv_chance = 20; // Шанс появления рекламы. Влияет на всю на странице.
  resolved = false;

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.currentPage = 1;
    this.week = '';
    this.loadStories();
  }

  resolver(chance = 0): void {
    const random_100 = +(Math.random() * 100).toFixed();
    this.resolved = random_100 <= chance ? true : false;
  }

  async loadStories(page = 1): Promise<void> {
    this.resolver(this.adv_chance);

    try {
      this.isLoading = true;
      const newsData = await this.storiesService.getStories(7, (page - 1) * 7);
      this.subscription = newsData.subscribe((newsData: singleStory[]) => {
        const mappedData = newsData.map(newsItem => ({
          ...newsItem,
        }));
        if (page === 1) {
          this.storiesGroups = [mappedData]; // Создаем первую группу новостей
        } else {
          this.storiesGroups.push(mappedData); // Добавляем новую группу к массиву
        }
        this.isLoading = false;
        this.currentPage = page + 1;
      });
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading stories:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private scrollTimeout: number;
  private prevScrollPosition = 0; // Переменная для хранения предыдущей позиции скролла

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (!this.isLoading && scrollPercentage >= 80) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = window.setTimeout(() => {
        const currentScrollPosition = window.scrollY;

        // Проверяем, что скролл двигается вниз
        if (currentScrollPosition > this.prevScrollPosition) {
          const currentGroupIndex = this.storiesGroups.length - 1; // Индекс текущей группы новостей
          const currentGroup = this.storiesGroups[currentGroupIndex];

          if (!currentGroup || currentGroup.length === 0) {
            return; // Ничего не делаем, если группа пуста или отсутствует
          }

          // Загружаем следующую группу новостей
          this.loadStories(this.currentPage);
        }

        // Обновляем предыдущую позицию скролла
        this.prevScrollPosition = currentScrollPosition;
      }, 500);
    }
  }
}
