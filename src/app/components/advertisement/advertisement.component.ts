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
          console.log(this.adsList);
        },
        (error) => {
          console.error('Error loading ads:', error);
        }
      );

    } catch (error) {
      console.error('Error loading ads:', error);
    }
  }
}
