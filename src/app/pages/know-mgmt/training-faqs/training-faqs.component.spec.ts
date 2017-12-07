import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFaqsComponent } from './training-faqs.component';

describe('TrainingFaqsComponent', () => {
  let component: TrainingFaqsComponent;
  let fixture: ComponentFixture<TrainingFaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingFaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
