import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReqComponent } from './training-req.component';

describe('TrainingReqComponent', () => {
  let component: TrainingReqComponent;
  let fixture: ComponentFixture<TrainingReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
