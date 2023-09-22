import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { singleNew } from '../../../interfaces/news-interface';
@Component({
  selector: 'app-stories-main-block',
  templateUrl: './stories-main-block.component.html',
  styleUrls: ['./stories-main-block.component.scss']
})
export class StoriesMainBlockComponent implements OnInit {
  storiesList: singleNew[] = []; // Создаем массив для хранения новостей

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  async loadStories() {
    try {
      const newsData = await this.newsService.getStories(6, 0)
      newsData.subscribe(
        (newsData: singleNew[]) => {
          // TODO: добавить отдельный интерфейс для историй
          this.storiesList = newsData;
          console.log('Data in stories-main-block: ', this.storiesList);
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
