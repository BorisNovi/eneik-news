import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoriesService } from '../../../core/services/stories.service';
import { singleStory } from '../../../core/models/stories-interface';

@Component({
  selector: 'app-stories-main-block',
  templateUrl: './stories-main-block.component.html',
  styleUrls: ['./stories-main-block.component.scss'],
})
export class StoriesMainBlockComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  storiesList: singleStory[] = [];

  constructor(private storiesService: StoriesService) {}

  ngOnInit(): void {
    this.loadStories();
  }

  async loadStories() {
    try {
      const storiesData = await this.storiesService.getStories(6, 0);
      this.subscription = storiesData.subscribe(
        (storiesData: singleStory[]) => {
          this.storiesList = storiesData;
        }
      );
    } catch (error) {
      console.error('Error loading stories:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
