import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square05',
  templateUrl: './square05.component.html',
  styleUrls: ['./square05.component.scss'],
})
export class Square05Component implements OnInit {
  @Input() data: singleNew;

  category: string;
  header: string;
  subheader: string;
  id: number;
  main_image: string;

  ngOnInit(): void {
    this.category = this.data ? this.data.category : ' ';
    this.header = this.data ? this.data.header : ' ';
    this.subheader = this.data ? this.data.subheader : ' ';
    this.id = this.data ? this.data.id : 0;
    this.main_image = this.data ? this.data.main_image : ' ';
  }
}
