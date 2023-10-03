import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { singleAd } from 'src/app/interfaces/ads-interface';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit{
  adsList: singleAd[] = [];
  header: string = ' ';
  id: number = 0;
  image: string = ' ';
  url: string = ' ';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadAds();
  }

  async loadAds() {
    try {
      const newsData = await this.newsService.getAds(4, 0);
      newsData.subscribe(
        (newsData: singleAd[]) => {
          this.adsList = newsData;

          // Временно. Потом нужно будет делать проход циклом
          this.header = this.adsList[0].header;
          this.id = this.adsList[0].id;
          this.image = this.adsList[0].image;
          this.url = this.adsList[0].url;
        }
      );

      newsData.subscribe(
        (error) => {
          console.error('Error loading ads:', error);
        }
      );

    } catch (error) {
      console.error('Error loading ads:', error);
    }
  }
}
