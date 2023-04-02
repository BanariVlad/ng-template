import { sidebarTransition } from '@/transitions';
import { PageRoutes } from '@/ts/enums';
import { MenuItem } from '@/ts/interfaces';
import { Component, OnInit } from '@angular/core';

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
      title: 'Game (AI)',
      icon: 'gamepad',
      to: PageRoutes.TicTacToe,
    },
    {
      title: 'Game (PVP)',
      icon: 'gamepad',
      to: PageRoutes.TicTacToeMultiplayer,
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
