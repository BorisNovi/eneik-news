import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square1',
  templateUrl: './square1.component.html',
  styleUrls: ['./square1.component.scss']
})
export class Square1Component implements OnInit {
  @Input() data: singleNew; // Объявление входного свойства для передачи данных

  category: string = ' ';
  header: string = ' ';
  id: number = 0;
  main_image: string = ' ';
  main_text: string = ' ';

  constructor() {
  }

  ngOnInit(): void {
    this.category = this.data.category;
    this.header = this.data.header;
    this.id = this.data.id;
    this.main_image = this.data.main_image;
    this.main_text = this.data.main_text;
  }
}
