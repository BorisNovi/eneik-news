import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleStory } from 'src/app/interfaces/stories-interface';

@Component({
  selector: 'app-stories-detail',
  templateUrl: './stories-detail.component.html',
  styleUrls: ['./stories-detail.component.scss']
})
export class StoriesDetailComponent implements OnInit {
  single_story: singleStory;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    const storiesId = this.route.snapshot.params['id'].slice(3);

    (await this.newsService.getStoriesById(storiesId)).subscribe(data => {
      this.single_story = data;
    });
  }
}
