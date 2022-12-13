import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterLink],
  exports: [SidebarComponent, NavbarComponent, HeaderComponent],
})
export class LayoutComponentsModule {}
