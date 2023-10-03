import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { singleStory } from 'src/app/interfaces/stories-interface';
@Component({
  selector: 'app-stories-main-block',
  templateUrl: './stories-main-block.component.html',
  styleUrls: ['./stories-main-block.component.scss']
})
export class StoriesMainBlockComponent implements OnInit {
  storiesList: singleStory[] = []; // Создаем массив для хранения новостей

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  async loadStories() {
    try {
      const storiesData = await this.newsService.getStories(6, 0)
      storiesData.subscribe(
        (storiesData: singleStory[]) => {
          this.storiesList = storiesData;
          console.log(this.storiesList);
        }
      );

      storiesData.subscribe(
        (error) => {
          console.error('Error loading stories:', error);
        }
      );

    } catch (error) {
      console.error('Error loading stories:', error);
    }
  }
}
