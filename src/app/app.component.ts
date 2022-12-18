import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-template';

  ngOnInit() {
    const isDark = localStorage.getItem('isDark')
      ? JSON.parse(localStorage.getItem('isDark') as string)
      : false;

    if (isDark) {
      document.documentElement.setAttribute('data-dark-theme', String(isDark));
    }
  }
}
