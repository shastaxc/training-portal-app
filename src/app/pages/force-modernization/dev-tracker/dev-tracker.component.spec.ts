import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTrackerComponent } from './dev-tracker.component';

describe('DevTrackerComponent', () => {
  let component: DevTrackerComponent;
  let fixture: ComponentFixture<DevTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
