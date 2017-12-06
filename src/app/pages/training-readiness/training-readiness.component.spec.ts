import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReadinessComponent } from './training-readiness.component';

describe('TrainingReadinessComponent', () => {
  let component: TrainingReadinessComponent;
  let fixture: ComponentFixture<TrainingReadinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingReadinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingReadinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
