import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldObservationsComponent } from './field-observations.component';

describe('FieldObservationsComponent', () => {
  let component: FieldObservationsComponent;
  let fixture: ComponentFixture<FieldObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
