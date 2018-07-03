import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsmapComponent } from './usmap.component';

describe('UsmapComponent', () => {
  let component: UsmapComponent;
  let fixture: ComponentFixture<UsmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
