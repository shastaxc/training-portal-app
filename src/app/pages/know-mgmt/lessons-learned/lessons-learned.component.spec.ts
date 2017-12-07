import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsLearnedComponent } from './lessons-learned.component';

describe('LessonsLearnedComponent', () => {
  let component: LessonsLearnedComponent;
  let fixture: ComponentFixture<LessonsLearnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsLearnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsLearnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
