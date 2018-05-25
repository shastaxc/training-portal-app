import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-planning-select',
  templateUrl: './planning-select.component.html',
  styleUrls: ['./planning-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlanningSelectComponent implements OnInit {

  selectDomainControl = new FormControl();
  selectClassControl = new FormControl();
  selectPOIControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

}
