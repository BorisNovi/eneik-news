import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleNew } from 'src/app/interfaces/news-interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})

export class NewsDetailComponent implements OnInit {
  single_new: singleNew;
  author: string;
  category: string;
  date: string;
  header: string;
  id: number;
  images_0: string[];
  images_1: string[];
  main_image: string;
  main_text: string;
  sub_text_0: string;
  sub_text_1: string;
  subheader: string;
  video: SafeResourceUrl;

  image_0_0: string; // Если будешь делать карусель, то убери это
  image_1_0: string; // Если будешь делать карусель, то убери это

  constructor(private route: ActivatedRoute, private newsService: NewsService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    const newsId = this.route.snapshot.params['id'].slice(3);

    (await this.newsService.getNewsById(newsId)).subscribe(data => {
      this.single_new = data;
      this.author = data.author;
      this.category = data.category;
      this.date = data.date;
      this.header = data.header;
      this.id = data.id;
      this.images_0 = data.images_0;
      this.images_1 = data.images_1;
      this.main_image = data.main_image;
      this.main_text = data.main_text;
      this.sub_text_0 = data.sub_text_0;
      this.sub_text_1 = data.sub_text_1;
      this.subheader = data.subheader;
      const data_video = data ? data.video : ' ';
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(data_video);

      this.image_0_0 = this.images_0[0];
      this.image_1_0 = this.images_1[0];
    });
  }
}

