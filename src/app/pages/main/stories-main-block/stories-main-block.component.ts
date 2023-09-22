import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { singleNew } from '../../../interfaces/news-interface';
@Component({
  selector: 'app-stories-main-block',
  templateUrl: './stories-main-block.component.html',
  styleUrls: ['./stories-main-block.component.scss']
})
export class StoriesMainBlockComponent implements OnInit {
  newsList: singleNew[] = []; // Создаем массив для хранения новостей

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  async loadNews() {
    try {
      const newsData = await this.newsService.getStories(4, 0)
      newsData.subscribe(
        (newsData: singleNew[]) => {
          // TODO: добавить отдельный интерфейс для историй
          this.newsList = newsData;
          console.log('Data in stories-main-block: ', this.newsList);
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
