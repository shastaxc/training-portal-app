import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowMgmtComponent } from './know-mgmt.component';

describe('KnowMgmtComponent', () => {
  let component: KnowMgmtComponent;
  let fixture: ComponentFixture<KnowMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
