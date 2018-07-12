import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedOpsComponent } from './closed-ops.component';

describe('ClosedopsComponent', () => {
  let component: ClosedOpsComponent;
  let fixture: ComponentFixture<ClosedOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
