import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { AlertState } from '@/store/alert/alert.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([AlertState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class StoreModule {}
