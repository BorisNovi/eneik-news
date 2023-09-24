import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    this.newsList = [];
    this.week = '';
    this.loadNews();
  }

  async loadNews(): Promise<void> {
    try {
      const newsData = await this.newsService.getNews(14, 0);
      newsData.subscribe(
        (newsData: singleNew[]) => {
          this.newsList = newsData.map((newsItem) => ({
            ...newsItem,
            category: 'news'
          }));
          //this.newsList = newsData; // когда в api будет приходить категория, раскомментровать нижнюю строку, а то, что сверху -  удалить
          console.log(this.newsList);
          this.week = this.getDates();
        },
        (error) => {
          console.error('Error loading news:', error);
        }
      );

    } catch (error) {
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
}
