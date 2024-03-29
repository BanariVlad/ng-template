import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private readonly isDark: string | null = localStorage.getItem('isDark');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.isDark && this.isDark !== 'undefined' && JSON.parse(this.isDark)) {
      this.document.body.classList.add('theme-dark');
    }
  }

  switchTheme() {
    try {
      this.document.body.classList.toggle('theme-dark');

      localStorage.setItem(
        'isDark',
        String(!JSON.parse(this.isDark as string))
      );
    } catch (e) {
      //set dark theme in case it's somehow undefined in localStorage
      localStorage.setItem('isDark', 'true');
    }
  }

  logout() {
    localStorage.removeItem('credentials');

    this.router.navigate(['/auth/login']);
  }
}
