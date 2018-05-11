import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMgmtComponent } from './contractmgmt.component';

describe('ContractMgmtComponent', () => {
  let component: ContractMgmtComponent;
  let fixture: ComponentFixture<ContractMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
