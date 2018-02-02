import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceModernizationComponent } from './force-modernization.component';

describe('TrainingReadinessComponent', () => {
  let component: ForceModernizationComponent;
  let fixture: ComponentFixture<ForceModernizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceModernizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceModernizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
