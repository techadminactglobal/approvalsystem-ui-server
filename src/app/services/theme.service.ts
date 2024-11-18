import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  isDarkMode() {
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
      if (this.darkMode) {
        document.documentElement.setAttribute('theme', "dark");
      } else {
        document.documentElement.setAttribute('theme', 'light');
      }
  }
}
