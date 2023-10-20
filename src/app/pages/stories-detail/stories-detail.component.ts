import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../services/stories.service';
import { singleStory } from 'src/app/interfaces/stories-interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stories-detail',
  templateUrl: './stories-detail.component.html',
  styleUrls: ['./stories-detail.component.scss'],
})
export class StoriesDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  single_story: singleStory;
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

  image_0_0: string;
  image_1_0: string;

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadSingleStory();
  }

  async loadSingleStory(): Promise<void> {
    const storiesId = this.route.snapshot.params['id'].slice(3);

    try {
      const singleStoryData =
        await this.storiesService.getStoriesById(storiesId);
      this.subscription = singleStoryData.subscribe(data => {
        this.single_story = data;
        this.author = data.author;
        this.category = data.category;
        this.date = data.date;
        this.header = data.header;
        this.id = data.id;
        this.images_0 = [data.image_1, data.image_2];
        this.images_1 = [data.image_3, data.image_4];
        this.main_image = data.main_image;
        this.main_text = data.main_text
          .replace(/\r\n/g, '<br>')
          .replace(/\r/g, '<br>');
        this.sub_text_0 = data.sub_text_0
          .replace(/\r\n/g, '<br>')
          .replace(/\r/g, '<br>');
        this.sub_text_1 = data.sub_text_1
          .replace(/\r\n/g, '<br>')
          .replace(/\r/g, '<br>');
        this.subheader = data.subheader;
        const data_video = data ? data.video : ' ';
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl(data_video);

        this.image_0_0 = this.images_0[0];
        this.image_1_0 = this.images_1[0];
      });
    } catch (error) {
      console.error('Error loading story:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
