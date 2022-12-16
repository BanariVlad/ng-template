import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { DefaultRouterModule } from '@/router/default-router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { AuthRouterModule } from '@/router/auth-router.module';
import { ConfirmDirective } from './directives/confirm.directive';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponentsModule } from '@/layout-components/layout-components.module';
import { StoreModule } from '@/store/store.module';

@NgModule({
  declarations: [AppComponent, ConfirmDirective],
  imports: [
    BrowserModule,
    RouterOutlet,
    DefaultRouterModule,
    AuthRouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutComponentsModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
