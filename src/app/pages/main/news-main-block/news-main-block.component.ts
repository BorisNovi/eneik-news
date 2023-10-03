import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service'; // Замените на путь к вашему NewsService
import { singleNew } from '../../../interfaces/news-interface';

@Component({
  selector: 'app-news-main-block',
  templateUrl: './news-main-block.component.html',
  styleUrls: ['./news-main-block.component.scss']
})
export class NewsMainBlockComponent implements OnInit {
  newsList: singleNew[] = []; // Создаем массив для хранения новостей

  new_1_id: number = 0;
  new_1_header: string = ' ';
  new_1_main: string = ' ';

  new_2_id: number = 0;
  new_2_header: string = ' ';

  new_3_id: number = 0;
  new_3_header: string = ' ';

  new_4_id: number = 0;
  new_4_header: string = ' ';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews(); // Вызываем метод загрузки новостей при инициализации компонента
  }

  async loadNews() {
    try {
      const newsData = await this.newsService.getNews(4, 0);
      newsData.subscribe(
        (newsData: singleNew[]) => {
          this.newsList = newsData;

          this.new_1_id = newsData[0] ? newsData[0].id : 0;
          this.new_1_header = newsData[0] ? newsData[0].header : ' ';
          this.new_1_main = newsData[0] ? newsData[0].main_text : ' ';

          this.new_2_id = newsData[1] ? newsData[1].id : 0;
          this.new_2_header = newsData[1] ? newsData[1].header : ' ';

          this.new_3_id = newsData[2] ? newsData[2].id : 0;
          this.new_3_header = newsData[2] ? newsData[2].header : ' ';

          this.new_4_id = newsData[3] ? newsData[3].id : 0;
          this.new_4_header = newsData[3] ? newsData[3].header : ' ';
        }
      );

      newsData.subscribe(
        (error) => {
          console.error('Error loading news:', error);
        }
      );

    } catch (error) {
      console.error('Error loading news:', error);
    }
  }
}
