import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  title = '404';

  constructor(public _location: Location) { }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
  }

}
