import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionChecklistComponent } from './mission-checklist.component';

describe('MissionChecklistComponent', () => {
  let component: MissionChecklistComponent;
  let fixture: ComponentFixture<MissionChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
