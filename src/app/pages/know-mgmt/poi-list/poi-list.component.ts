import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit {

  title = 'POI List';

  constructor() { }

  ngOnInit() {
  }

}
