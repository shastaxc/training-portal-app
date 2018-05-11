import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrlComponent } from './cdrl.component';

describe('CdrlComponent', () => {
  let component: CdrlComponent;
  let fixture: ComponentFixture<CdrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
