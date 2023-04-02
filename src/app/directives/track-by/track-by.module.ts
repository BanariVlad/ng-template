import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByPropertyDirective } from './track-by-property.directive';

@NgModule({
  declarations: [TrackByPropertyDirective],
  imports: [CommonModule],
  exports: [TrackByPropertyDirective],
})
export class TrackByModule {}
