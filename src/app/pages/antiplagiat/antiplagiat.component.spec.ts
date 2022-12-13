import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiplagiatComponent } from './antiplagiat.component';

describe('AntiplagiatComponent', () => {
  let component: AntiplagiatComponent;
  let fixture: ComponentFixture<AntiplagiatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AntiplagiatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiplagiatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
