import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  changeTheme() {
    const isDark = localStorage.getItem('isDark')
      ? JSON.parse(localStorage.getItem('isDark') as string)
      : false;

    document.documentElement.setAttribute('data-dark-theme', String(!isDark));

    localStorage.setItem('isDark', String(!isDark));
  }
}
