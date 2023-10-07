import { Component, HostListener, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleArt } from 'src/app/interfaces/arts-interface';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.scss']
})

// Это временная версия. В следующем изменении будет сделана как на макете.
export class ArtComponent implements OnInit {
  artsGroups: singleArt[][] = [];
  week: string;
  isLoading: boolean;
  currentPage: number;
  adv_chance: number = 20; // Шанс появления рекламы. Влияет на всю на странице.
  resolved: boolean = false;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;
    this.currentPage = 1;
    this.week = '';
    this.loadarts();
  }

  resolver(chance: number = 0): void {
    const random_100 = +(Math.random() * 100).toFixed();
    this.resolved = random_100 <= chance ? true : false;
  }

  async loadarts(page: number = 1): Promise<void> {
    this.resolver(this.adv_chance);

    try {
      this.isLoading = true;
      const newsData = await this.newsService.getArts(7, (page - 1) * 7);
      newsData.subscribe(
        (newsData: singleArt[]) => {
          const mappedData = newsData.map((newsItem) => ({
            ...newsItem
          }));
          if (page === 1) {
            this.artsGroups = [mappedData]; // Создаем первую группу новостей
          } else {
            this.artsGroups.push(mappedData); // Добавляем новую группу к массиву
          }
          this.isLoading = false;
          this.currentPage = page + 1;
        }
      );

    } catch (error) {
      this.isLoading = false;
      console.error('Error loading arts:', error);
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
