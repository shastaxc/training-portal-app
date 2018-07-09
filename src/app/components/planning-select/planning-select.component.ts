import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-planning-select',
  templateUrl: './planning-select.component.html',
  styleUrls: ['./planning-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanningSelectComponent implements OnInit {

  domainControl = new FormControl();
  classControl = new FormControl();
  poiControl = new FormControl();
  instructorControl = new FormControl();
  dateControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  findResults(): void {
    if (this.domainControl.value && this.classControl.value
      && this.poiControl.value && this.instructorControl.value
      && this.dateControl.value) {
      // Retrieve contents and populate page
    }
  }

}
