import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstDetailComponent } from './inst-detail.component';

describe('InstDetailComponent', () => {
  let component: InstDetailComponent;
  let fixture: ComponentFixture<InstDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
