import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from '../../../core/models/news-interface';

@Component({
  selector: 'app-square025',
  templateUrl: './square025.component.html',
  styleUrls: ['./square025.component.scss'],
})
export class Square025Component implements OnInit {
  @Input() data: singleNew;

  category: string;
  header: string;
  id: number;
  main_image: string;

  ngOnInit(): void {
    this.category = this.data ? this.data.category : ' ';
    this.header = this.data ? this.data.header : ' ';
    this.id = this.data ? this.data.id : 0;
    this.main_image = this.data ? this.data.main_image : ' ';
  }
}
