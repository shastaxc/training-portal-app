import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPkgFieldDocComponent } from './total-pkg-field-doc.component';

describe('TotalPkgFieldDocComponent', () => {
  let component: TotalPkgFieldDocComponent;
  let fixture: ComponentFixture<TotalPkgFieldDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPkgFieldDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPkgFieldDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
