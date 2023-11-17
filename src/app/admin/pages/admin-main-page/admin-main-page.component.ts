import { Component } from '@angular/core';
import { NewsService } from '../../../core/services/news.service';
import { postNew } from '../../../core/models/news-interface';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss'],
})
export class AdminMainPageComponent {
  body: postNew = {
    category: 'news',
    header: 'post test',
    subheader: 'post test',
    author: 'post test',
    main_image: null,
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    main_text: 'post test',
    sub_text_0: 'post test',
    sub_text_1: 'post test',
    video: null,
  };

  accessToken = sessionStorage.getItem('accessToken');
  postError = '';
  header: string;

  constructor(private news: NewsService) {}

  async shitpost() {
    await this.news
      .postNew(this.body, this.accessToken)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        this.postError = error.error.detail;
      });
  }
}
