import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square05',
  templateUrl: './square05.component.html',
  styleUrls: ['./square05.component.scss'],
})
export class Square05Component implements OnInit {
  @Input() data: singleNew; // Объявление входного свойства для передачи данных

  category: string;
  header: string;
  id: number;
  main_image: string;
  main_text: string;

  constructor() {}

  ngOnInit(): void {
    this.category = this.data ? this.data.category : ' ';
    this.header = this.data ? this.data.header : ' ';
    this.id = this.data ? this.data.id : 0;
    this.main_image = this.data ? this.data.main_image : ' ';
    this.main_text = this.data ? this.data.main_text : ' ';
  }
}
