import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantviewComponent } from './constantview.component';

describe('ConstantviewComponent', () => {
  let component: ConstantviewComponent;
  let fixture: ComponentFixture<ConstantviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstantviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
