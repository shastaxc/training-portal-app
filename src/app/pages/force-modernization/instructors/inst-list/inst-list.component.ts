import { Component, OnInit } from '@angular/core';
import * as data from '../../../../../assets/docs/instructors.json';

@Component({
  selector: 'app-inst-list',
  templateUrl: './inst-list.component.html',
  styleUrls: ['./inst-list.component.scss']
})
export class InstListComponent implements OnInit {

  title = 'Instructor Skills Matrix';
  instructors = <any>data;

  constructor() { }

  ngOnInit() {
  }

}
