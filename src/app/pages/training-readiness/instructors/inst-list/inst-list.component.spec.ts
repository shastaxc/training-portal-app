import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstListComponent } from './inst-list.component';

describe('InstListComponent', () => {
  let component: InstListComponent;
  let fixture: ComponentFixture<InstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
