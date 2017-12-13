import { Component, OnInit } from '@angular/core';
import * as data from '../../../../../assets/docs/instructors.json';

@Component({
  selector: 'app-inst-detail',
  templateUrl: './inst-detail.component.html',
  styleUrls: ['./inst-detail.component.scss']
})
export class InstDetailComponent implements OnInit {

  title = 'Instructor Detail';
  instructors = <any>data;

  constructor() { }

  ngOnInit() {
  }

}
