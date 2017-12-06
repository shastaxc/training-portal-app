import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDataComponent } from './program-data.component';

describe('ProgramDataComponent', () => {
  let component: ProgramDataComponent;
  let fixture: ComponentFixture<ProgramDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
