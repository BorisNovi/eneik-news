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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isScrollLocked = this.isMenuOpen;

    if (this.isScrollLocked) {
      document.querySelector('body')!.style.overflow = 'hidden';
    } else {
      document.querySelector('body')!.style.overflow = 'initial';
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isScrollLocked = false;
  }

}
