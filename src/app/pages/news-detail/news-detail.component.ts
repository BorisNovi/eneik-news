import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})

export class NewsDetailComponent implements OnInit {
  single_new: singleNew;

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    const newsId = this.route.snapshot.params['id'].slice(3);

    (await this.newsService.getNewsById(newsId)).subscribe(data => {
      this.single_new = data;
    });
  }
}

