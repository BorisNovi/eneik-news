import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/news.service';
import { singleNew } from '../../../core/models/news-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-main-block',
  templateUrl: './news-main-block.component.html',
  styleUrls: ['./news-main-block.component.scss'],
})
export class NewsMainBlockComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  newsList: singleNew[] = [];

  new_1_id = 0;
  new_1_header = ' ';
  new_1_subheader = ' ';

  new_2_id = 0;
  new_2_header = ' ';

  new_3_id = 0;
  new_3_header = ' ';

  new_4_id = 0;
  new_4_header = ' ';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews(); // Вызываем метод загрузки новостей при инициализации компонента
  }

  async loadNews() {
    try {
      const newsData = await this.newsService.getNews(4, 0);
      this.subscription = newsData.subscribe((newsData: singleNew[]) => {
        this.newsList = newsData;

        this.new_1_id = newsData[0] ? newsData[0].id : 0;
        this.new_1_header = newsData[0] ? newsData[0].header : ' ';
        this.new_1_subheader = newsData[0] ? newsData[0].subheader : ' ';

        this.new_2_id = newsData[1] ? newsData[1].id : 0;
        this.new_2_header = newsData[1] ? newsData[1].header : ' ';

        this.new_3_id = newsData[2] ? newsData[2].id : 0;
        this.new_3_header = newsData[2] ? newsData[2].header : ' ';

        this.new_4_id = newsData[3] ? newsData[3].id : 0;
        this.new_4_header = newsData[3] ? newsData[3].header : ' ';
      });
    } catch (error) {
      console.error('Error loading news:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
