import { Component, OnInit } from '@angular/core';
import { ThingsService } from '../../services/things.service';
import { singleThing } from 'src/app/interfaces/things-interface';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss'],
})
export class ThingComponent implements OnInit {
  adsList: singleThing[] = [];
  header = ' ';
  id = 0;
  main_image = ' ';
  url = ' ';

  constructor(private thingsService: ThingsService) {}

  ngOnInit(): void {
    this.loadThings();
  }

  async loadThings() {
    try {
      const newsData = await this.thingsService.getThings(4, 0);
      newsData.subscribe((newsData: singleThing[]) => {
        this.adsList = newsData;

        // Временно. Потом нужно будет делать проход циклом
        this.header = this.adsList[0].header;
        this.id = this.adsList[0].id;
        this.main_image = this.adsList[0].main_image;
        this.url = this.adsList[0].url;
      });
    } catch (error) {
      console.error('Error loading ads:', error);
    }
  }
}
