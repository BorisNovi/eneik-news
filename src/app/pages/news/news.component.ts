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
  newsList: singleNew[] = [];
  week: string;
  isLoading: boolean;
  currentPage: number;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = false;
    this.currentPage = 1;
    this.newsList = [];
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
            ...newsItem,
            category: 'news'
          }));
          if (page === 1) {
            this.newsList = mappedData;
          } else {
            this.newsList.push(...mappedData);
          }
          //this.newsList = newsData; // когда в api будет приходить категория, раскомментровать нижнюю строку, а то, что сверху -  удалить
          console.log(this.newsList);
          this.isLoading = false;
          this.currentPage = page + 1;
          this.week = this.getDates();
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

  private getDates(): string {
    let startDate = new Date();
    if (this.newsList[6]) {
      startDate = new Date(this.newsList[6].date);
    }
    const endDate = new Date(this.newsList[0].date);

    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const endMonth = endDate.toLocaleString('default', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    console.log('month: ', endDate);


    return `${endDay} ${endMonth} - ${startDay} ${startMonth}`;
  }

  private scrollTimeout: any;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (!this.isLoading && scrollPercentage >= 80) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      this.scrollTimeout = setTimeout(() => {
        this.loadNews(this.currentPage); // Этот метод надо настраивать
      }, 1000);
    }
  }

}
