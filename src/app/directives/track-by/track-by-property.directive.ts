import { Directive, Host, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Directive({
  selector: '[ngForKey]',
})
export class TrackByPropertyDirective {
  private property = '';

  public constructor(@Host() private readonly ngFor: NgForOf<any>) {
    this.ngFor.ngForTrackBy = (index: number, item: any) =>
      this.property && typeof item === 'object' && this.property in item ? item[this.property] : index;
  }

  @Input('ngForKey')
  public set propertyName(value: string) {
    this.property = value;
  }
}
