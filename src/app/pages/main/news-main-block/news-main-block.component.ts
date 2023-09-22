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

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews(); // Вызываем метод загрузки новостей при инициализации компонента
  }

  async loadNews() {
    try {
      const newsData = await this.newsService.getNews(4, 0); // Получаем новости с помощью сервиса
      newsData.subscribe(
        (newsData: singleNew[]) => {
          this.newsList = newsData; // Присваиваем новости переменной newsList
          console.log(this.newsList);
        },
        (error) => {
          console.error('Error loading news:', error);
        }
      );

    } catch (error) {
      console.error('Error loading news:', error);
    }
  }
}
