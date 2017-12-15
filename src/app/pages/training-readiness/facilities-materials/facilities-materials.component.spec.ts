import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesMaterialsComponent } from './facilities-materials.component';

describe('FacilitiesMaterialsComponent', () => {
  let component: FacilitiesMaterialsComponent;
  let fixture: ComponentFixture<FacilitiesMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
