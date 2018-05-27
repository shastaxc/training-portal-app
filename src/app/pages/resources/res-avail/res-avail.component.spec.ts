import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResAvailComponent } from './res-avail.component';

describe('ResAvailComponent', () => {
  let component: ResAvailComponent;
  let fixture: ComponentFixture<ResAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
