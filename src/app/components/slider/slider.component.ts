import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() data: string[];

  images: string[];
  currentSlideIndex = 0;

  ngOnInit(): void {
    this.images = this.data || [];
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
  }

  prevSlideIndex() {
    return (
      (this.currentSlideIndex - 1 + this.images.length) % this.images.length
    );
  }

  nextSlideIndex() {
    return (this.currentSlideIndex + 1) % this.images.length;
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    }
    if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }
}
