import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArtsService } from '../../../core/services/arts.service';
import { singleArt } from '../../../core/models/arts-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-art-main-component',
  templateUrl: './art-main-component.component.html',
  styleUrls: ['./art-main-component.component.scss'],
})
export class ArtMainComponentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  artsList: singleArt[] = [];

  constructor(private artsService: ArtsService) {}

  ngOnInit(): void {
    this.loadArts();
  }

  async loadArts() {
    try {
      const artsData = await this.artsService.getArts(7, 0);
      this.subscription = artsData.subscribe((artsData: singleArt[]) => {
        this.artsList = artsData;
        console.log(this.artsList);
      });
    } catch (error) {
      console.error('Error loading arts:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
