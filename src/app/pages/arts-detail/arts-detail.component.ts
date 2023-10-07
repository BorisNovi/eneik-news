import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleArt } from 'src/app/interfaces/arts-interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-arts-detail',
  templateUrl: './arts-detail.component.html',
  styleUrls: ['./arts-detail.component.scss']
})

export class ArtsDetailComponent implements OnInit{
  single_art: singleArt;
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
    const artsId = this.route.snapshot.params['id'].slice(3);

    (await this.newsService.getArtsById(artsId)).subscribe(data => {
      this.single_art = data;
      this.author = data.author;
      this.category = data.category;
      this.date = data.date;
      this.header = data.header;
      this.id = data.id;
      this.images_0 = [data.image_1, data.image_2];
      this.images_1 = [data.image_3, data.image_4];
      this.main_image = data.main_image;
      this.main_text = data.main_text.replace(/\r\n/g, '<br>').replace(/\r/g, '<br>');
      this.sub_text_0 = data.sub_text_0.replace(/\r\n/g, '<br>').replace(/\r/g, '<br>');
      this.sub_text_1 = data.sub_text_1.replace(/\r\n/g, '<br>').replace(/\r/g, '<br>');
      this.subheader = data.subheader;
      const data_video = data ? data.video : ' ';
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(data_video);

      this.image_0_0 = this.images_0[0];
      this.image_1_0 = this.images_1[0];
    });
  }
}
