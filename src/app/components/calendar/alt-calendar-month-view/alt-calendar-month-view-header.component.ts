import { Component, Input, TemplateRef } from '@angular/core';
import { WeekDay } from 'calendar-utils';
import { trackByWeekDayHeaderDate } from 'angular-calendar/modules/common/util';

@Component({
  selector: 'app-alt-calendar-month-view-header',
  templateUrl: 'alt-calendar-month-view-header.component.html',
  styleUrls: ['./alt-calendar-month-view-header.component.scss']
})
export class AltCalendarMonthViewHeaderComponent {
    @Input() days: WeekDay[];
    @Input() locale: string;
    @Input() customTemplate: TemplateRef<any>;
    trackByWeekDayHeaderDate: (index: number, day: WeekDay) => string;

    constructor() {
      this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
}
