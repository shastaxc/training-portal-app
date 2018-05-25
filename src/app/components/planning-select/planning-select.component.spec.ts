import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSelectComponent } from './planning-select.component';

describe('PlanningSelectComponent', () => {
  let component: PlanningSelectComponent;
  let fixture: ComponentFixture<PlanningSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
