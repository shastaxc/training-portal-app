import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqlMetricsComponent } from './aql-metrics.component';

describe('AqlMetricsComponent', () => {
  let component: AqlMetricsComponent;
  let fixture: ComponentFixture<AqlMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqlMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
