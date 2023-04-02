import { TrackByModule } from '@/directives/track-by/track-by.module';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
    AlertComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterLink, TrackByModule],
  exports: [SidebarComponent, NavbarComponent, HeaderComponent, AlertComponent],
})
export class LayoutComponentsModule {}
