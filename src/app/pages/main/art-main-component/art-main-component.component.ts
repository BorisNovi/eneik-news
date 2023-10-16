import { Component, OnInit } from '@angular/core';
import { ArtsService } from 'src/app/services/arts.service';
import { singleArt } from 'src/app/interfaces/arts-interface';

@Component({
  selector: 'app-art-main-component',
  templateUrl: './art-main-component.component.html',
  styleUrls: ['./art-main-component.component.scss'],
})
export class ArtMainComponentComponent implements OnInit {
  artsList: singleArt[] = []; // Создаем массив для хранения новостей

  constructor(private artsService: ArtsService) {}

  ngOnInit(): void {
    this.loadarts();
  }

  async loadarts() {
    try {
      const artsData = await this.artsService.getArts(7, 0);
      artsData.subscribe((artsData: singleArt[]) => {
        this.artsList = artsData;
        console.log(this.artsList);
      });
    } catch (error) {
      console.error('Error loading arts:', error);
    }
  }
}
