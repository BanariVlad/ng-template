import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponentsModule } from '@/layout-components/layout-components.module';
import { AuthRouterModule } from '@/router/auth-router.module';
import { DefaultRouterModule } from '@/router/default-router.module';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { StoreModule } from '@/store/store.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { ConfirmDirective } from './directives/confirm.directive';

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
  exports: [],
})
export class AppModule {}
