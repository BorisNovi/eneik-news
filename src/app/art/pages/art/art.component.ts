import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtsService } from '../../../core/services/arts.service';
import { singleArt } from '../../../core/models/arts-interface';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss'],
})
export class ArtComponent implements OnInit, OnDestroy {
  artsGroups: singleArt[][] = [];
  subscription: Subscription;
  isLoading: boolean;
  currentPage: number;
  adv_chance = 20; // Шанс появления рекламы. Влияет на всю на странице.
  resolved = false;

  constructor(
    private route: ActivatedRoute,
    private artsService: ArtsService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.currentPage = 1;
    this.loadarts();
  }

  resolver(chance = 0): void {
    const random_100 = +(Math.random() * 100).toFixed();
    this.resolved = random_100 <= chance;
  }

  async loadarts(page = 1): Promise<void> {
    this.resolver(this.adv_chance);

    try {
      this.isLoading = true;
      const newsData = await this.artsService.getArts(1, (page - 1) * 1);
      this.subscription = newsData.subscribe((newsData: singleArt[]) => {
        const mappedData: singleArt[] = [...newsData];
        /*
        Эта совершенно уасающая конструкция берет один объект арта,
        удаляет из него заголовки и заменяет главное изображение на
        изображения приходящие по ключам image_n.
        И так i раз, запихивая каждый измененный объект в mappedData.
       */
        for (let i = 1; i <= 5; i++) {
          const data = newsData.map(newsItem => ({
            ...newsItem,
            main_image: newsItem[`image_${i}`],
            header: '',
            subheader: '',
          }));
          mappedData.push(...data);
        }

        if (page === 1) {
          this.artsGroups = [mappedData]; // Создаем первую группу новостей
        } else {
          this.artsGroups.push(mappedData); // Добавляем новую группу к массиву
        }
        this.isLoading = false;
        this.currentPage = page + 1;
      });
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading arts:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private scrollTimeout: number;
  private prevScrollPosition = 0; // Переменная для хранения предыдущей позиции скролла

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
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
          const currentGroupIndex = this.artsGroups.length - 1; // Индекс текущей группы новостей
          const currentGroup = this.artsGroups[currentGroupIndex];

          if (!currentGroup || currentGroup.length === 0) {
            return; // Ничего не делаем, если группа пуста или отсутствует
          }

          // Загружаем следующую группу новостей
          this.loadarts(this.currentPage);
        }

        // Обновляем предыдущую позицию скролла
        this.prevScrollPosition = currentScrollPosition;
      }, 500);
    }
  }
}
