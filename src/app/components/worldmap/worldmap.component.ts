import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})
export class WorldmapComponent implements OnInit {
  private bodyText: string;

  constructor() {
  }

  ngOnInit() {

  }

  openModal(id: string) {}
}
