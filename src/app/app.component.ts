import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuOpen: boolean = false;
  isScrollLocked: boolean = false;
  title = 'eneik-news';

  toggleMenu(close: number = 0) {
    this.isMenuOpen = !this.isMenuOpen;
    this.isScrollLocked = this.isMenuOpen;

    if (close) {
      this.isMenuOpen = false;
      this.isScrollLocked = false;
    }

    if (this.isScrollLocked) {
      document.querySelector('body')!.style.overflow = 'hidden';
    } else {
      document.querySelector('body')!.style.overflow = '';
    }
  }
}
