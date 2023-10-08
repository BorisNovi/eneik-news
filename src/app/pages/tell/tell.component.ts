import { Component } from '@angular/core';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.scss'],
})
export class TellComponent {
  mail = 'eneik.group@gmail.com';
  copy_hint = false;

  copy() {
    const textArea = document.createElement('textarea');
    textArea.value = this.mail;
    document.body.appendChild(textArea);

    textArea.select();

    try {
      document.execCommand('copy');
      this.copy_hint = true;
      setTimeout(() => (this.copy_hint = false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать почту в буфер обмена', err);
    }
    document.body.removeChild(textArea);
  }
}
