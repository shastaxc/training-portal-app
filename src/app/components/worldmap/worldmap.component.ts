import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})
export class WorldmapComponent implements OnInit {
  private bodyText: string;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  openModal(id: string) {
      let dialogRef = this.dialog.open(MapDialogComponent, {
        data: {filename: id}
      });
  }
}
