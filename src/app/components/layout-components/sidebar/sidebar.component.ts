import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enums';
import { sidebarTransition } from '@/transitions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarTransition],
})
export class SidebarComponent implements OnInit {
  menuState = 'closed';
  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      to: PageRoutes.Dashboard,
    },
    {
      title: 'CRUD',
      icon: 'folder',
      to: PageRoutes.Categories,
    },
    {
      title: 'Tools',
      icon: 'construction',
      to: PageRoutes.Tools,
    },
    {
      title: 'Help',
      icon: 'info',
      to: PageRoutes.Help,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menuState = this.menuState === 'closed' ? 'opened' : 'closed';
  }

  closeMenu() {
    this.menuState = 'closed';
  }
}
