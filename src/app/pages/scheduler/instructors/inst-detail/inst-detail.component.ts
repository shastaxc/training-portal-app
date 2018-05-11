import { Component, OnInit } from '@angular/core';
import * as data from '../../../../../assets/docs/instructors.json';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inst-detail',
  templateUrl: './inst-detail.component.html',
  styleUrls: ['./inst-detail.component.scss']
})
export class InstDetailComponent implements OnInit {

  title = 'Instructor Detail';
  instructors = <any>data;
  id: number;
  details: any;

  constructor(private route: ActivatedRoute, private _location: Location) { }

  goBack() {
    this._location.back();
  }

  parseDateTime(datetime: string) {
    // Assumes format DDMONYYYYHHMM(Z) -- DayMonthYearHourMin(Timezone)
    // Timezone is +N or -N where N is number of hours diff from UTC
    const day: string = datetime.substring(0, 2);
    const month: string = datetime.substring(2, 5);
    const year: string = datetime.substring(5, 9);
    const time: string = datetime.substring(9, 13);
    const timezone: string = datetime.substring(14, 16);
    return day + ' ' + month + ' ' + year + ' ' + time + ' (UTC' + timezone + ')';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.instructors.forEach(element => {
        if (element.id === params['id']) {
          this.details = element;
        }
      });
   });
  }
}
