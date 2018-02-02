import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAssetsComponent } from './training-assets.component';

describe('TrainingAssetsComponent', () => {
  let component: TrainingAssetsComponent;
  let fixture: ComponentFixture<TrainingAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
