import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square025',
  templateUrl: './square025.component.html',
  styleUrls: ['./square025.component.scss']
})
export class Square025Component implements OnInit {
  @Input() data: singleNew; // Объявление входного свойства для передачи данных

  category: string = ' ';
  header: string = ' ';
  id: number = 0;
  main_image: string = ' ';

  constructor() {
  }

  ngOnInit(): void {
    this.category = this.data.category;
    this.header = this.data.header;
    this.id = this.data.id;
    this.main_image = this.data.main_image;
  }
}
