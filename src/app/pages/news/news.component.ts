import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})



export class NewsComponent implements OnInit {
  newsGroups: singleNew[][] = [];
  week: string;
  isLoading: boolean;
  currentPage: number;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;
    this.currentPage = 1;
    this.week = '';
    this.loadNews();
  }

  async loadNews(page: number = 1): Promise<void> {
    try {
      this.isLoading = true;
      const newsData = await this.newsService.getNews(7, (page - 1) * 7);
      newsData.subscribe(
        (newsData: singleNew[]) => {
          const mappedData = newsData.map((newsItem) => ({
            ...newsItem
          }));
          if (page === 1) {
            this.newsGroups = [mappedData]; // Создаем первую группу новостей
          } else {
            this.newsGroups.push(mappedData); // Добавляем новую группу к массиву
          }
          this.isLoading = false;
          this.currentPage = page + 1;
        },
        (error) => {
          this.isLoading = false;
          console.error('Error loading news:', error);
        }
      );
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading news:', error);
    }
  }

  public getDates(groupIndex: number): string {
    const group = this.newsGroups[groupIndex];
    if (!group || group.length === 0) {
      return 'Новости закончились!'; // Если группа пуста или отсутствует
    }

    const startDate = new Date(group[group.length - 1].date);
    const endDate = new Date(group[0].date);

    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    return `${endDay} ${endMonth} - ${startDay} ${startMonth}`;
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
          const currentGroupIndex = this.newsGroups.length - 1; // Индекс текущей группы новостей
          const currentGroup = this.newsGroups[currentGroupIndex];

          if (!currentGroup || currentGroup.length === 0) {
            return; // Ничего не делаем, если группа пуста или отсутствует
          }

          // Загружаем следующую группу новостей
          this.loadNews(this.currentPage);
        }

        // Обновляем предыдущую позицию скролла
        this.prevScrollPosition = currentScrollPosition;
      }, 500);
    }
  }


}
