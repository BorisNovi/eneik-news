import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square1',
  templateUrl: './square1.component.html',
  styleUrls: ['./square1.component.scss']
})
export class Square1Component implements OnInit {
  @Input() data: singleNew; // Объявление входного свойства для передачи данных

  constructor() {
  }

  ngOnInit(): void {
    this.processData();
  }

  // Далее вы можете добавить методы и логику для обработки объекта данных, например:

  // Пример метода для обработки данных
  async processData() {

  }
}
