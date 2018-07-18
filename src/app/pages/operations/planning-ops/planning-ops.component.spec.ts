import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOpsComponent } from './planning-ops.component';

describe('PlanningOpsComponent', () => {
  let component: PlanningOpsComponent;
  let fixture: ComponentFixture<PlanningOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
