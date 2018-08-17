import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';

declare interface DialogData {
  event: CalendarEvent;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  title: string;
  start: Date;
  end: Date;
  location: string;
  domain: string;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.title = data.event.title;
    this.start = data.event.start;
    this.end = data.event.end;
    this.location = (data.event.meta.location === void 0) ? 'Unknown' : data.event.meta.location;
    this.domain = (data.event.meta.domain === void 0) ? 'Unknown' : data.event.meta.domain;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
