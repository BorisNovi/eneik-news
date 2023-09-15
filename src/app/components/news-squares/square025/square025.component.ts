import { Component, Input, OnInit } from '@angular/core';
import { singleNew } from 'src/app/interfaces/news-interface';

@Component({
  selector: 'app-square025',
  templateUrl: './square025.component.html',
  styleUrls: ['./square025.component.scss']
})
export class Square025Component implements OnInit {
  @Input() data: singleNew; // Объявление входного свойства для передачи данных

  constructor() {
  }

  ngOnInit(): void {
    this.processData();
  }

  // Далее вы можете добавить методы и логику для обработки объекта данных, например:

  // Пример метода для обработки данных
  async processData() {

    console.log('Received data in square 1: ', this.data);
  }
}
