import { Component, HostListener, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleStory} from 'src/app/interfaces/stories-interface';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit{
  storiesGroups: singleStory[][] = [];
  week: string;
  isLoading: boolean;
  currentPage: number;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;
    this.currentPage = 1;
    this.week = '';
    this.loadStories();
  }

  async loadStories(page: number = 1): Promise<void> {
    try {
      this.isLoading = true;
      const newsData = await this.newsService.getStories(7, (page - 1) * 7);
      newsData.subscribe(
        (newsData: singleStory[]) => {
          const mappedData = newsData.map((newsItem) => ({
            ...newsItem
          }));
          if (page === 1) {
            this.storiesGroups = [mappedData]; // Создаем первую группу новостей
          } else {
            this.storiesGroups.push(mappedData); // Добавляем новую группу к массиву
          }
          this.isLoading = false;
          this.currentPage = page + 1;
        },
        (error) => {
          this.isLoading = false;
          console.error('Error loading stories:', error);
        }
      );
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading stories:', error);
    }
  }

  private scrollTimeout: any;
  private prevScrollPosition: number = 0; // Переменная для хранения предыдущей позиции скролла

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (!this.isLoading && scrollPercentage >= 80) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = setTimeout(() => {
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

