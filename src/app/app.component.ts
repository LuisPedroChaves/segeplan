import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @HostBinding('class') className = ''
  theme = 'lightMode'

  constructor(
    private overlay: OverlayContainer
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('theme')) {
      this.theme = localStorage.getItem('theme')!
      this.setThemeClass()
    }
  }

  changeMode() {
    this.theme = (this.theme === 'lightMode') ? 'darkMode' : 'lightMode'
    this.setThemeClass()

    localStorage.setItem('theme', this.theme)
  }

  setThemeClass() {
    if (this.theme === 'lightMode') {
      this.className = '';
      this.overlay.getContainerElement().classList.remove('darkMode');
      return
    }

    this.className = 'darkMode'
    this.overlay.getContainerElement().classList.add(this.className);
  }

}
