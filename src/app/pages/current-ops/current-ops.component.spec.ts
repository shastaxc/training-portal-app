import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOpsComponent } from './current-ops.component';

describe('CurrentOpsComponent', () => {
  let component: CurrentOpsComponent;
  let fixture: ComponentFixture<CurrentOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
