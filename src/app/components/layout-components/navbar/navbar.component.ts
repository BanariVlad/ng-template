import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private readonly isDark: string | null = localStorage.getItem('isDark');

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.isDark && JSON.parse(this.isDark)) {
      this.document.body.classList.toggle('theme-dark');
    }
  }

  switchTheme() {
    this.document.body.classList.toggle('theme-dark');

    localStorage.setItem('isDark', String(!JSON.parse(this.isDark ?? 'false')));
  }
}
