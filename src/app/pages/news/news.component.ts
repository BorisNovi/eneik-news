import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{
  someNew = 'new placeholder';
  news: any;
  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  async ngOnInit(): Promise<void> {
    (await this.newsService.getNews()).subscribe(data => {
      console.log('Новости: ', data);
      this.news = data;
    });
  }
}






