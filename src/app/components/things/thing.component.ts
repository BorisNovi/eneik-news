import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { singleThing } from 'src/app/interfaces/things-interface';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss']
})
export class ThingComponent implements OnInit{
  adsList: singleThing[] = [];
  header: string = ' ';
  id: number = 0;
  main_image: string = ' ';
  url: string = ' ';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadThings();
  }

  async loadThings() {
    try {
      const newsData = await this.newsService.getAds(4, 0);
      newsData.subscribe(
        (newsData: singleThing[]) => {
          this.adsList = newsData;

          // Временно. Потом нужно будет делать проход циклом
          this.header = this.adsList[0].header;
          this.id = this.adsList[0].id;
          this.main_image = this.adsList[0].main_image;
          this.url = this.adsList[0].url;
        }
      );

    } catch (error) {
      console.error('Error loading ads:', error);
    }
  }
}
