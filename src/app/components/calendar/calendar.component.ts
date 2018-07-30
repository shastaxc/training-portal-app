import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  getMonth,
  startOfMonth,
  startOfWeek,
  startOfDay,
  endOfMonth,
  endOfWeek,
  endOfDay,
  subDays,
  addDays
} from 'date-fns';
import { CalendarEvent } from 'angular-calendar';
import { colors } from './cal-utils/colors';
import * as scheduledata from '../../../assets/docs/schedule.json';

// TODO: Import EventColor interface instead of redefining
interface EventColor {
  primary: string;
  secondary: string;
}

interface ScheduleEntry {
  title: string;
  start: string;
  end: string;
  location?: string;
  domain: string;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  searchText: string;

  schedule: ScheduleEntry[] = scheduledata.default;

  view: string = 'month';

  viewDate: Date = new Date();  // Defaults to current date.
  calendarEvents: CalendarEvent[] = [];

  ngOnInit(): void {
    this.schedule.forEach(entry => {  // Loops through JSON entries
      const calevent: CalendarEvent = {
        title: entry.title,
        start: new Date(entry.start),
        end: new Date(entry.end),
        color: this.getDomainColor(entry.domain),
        cssClass: 'sq-cal-event',
        meta: {
          location: entry.location,
          domain: entry.domain
        }
      };
      this.addEvent(calevent);
    });

    this.updateCalendarEvents();
  }

  updateCalendarEvents(): void {
    const startOfPeriod: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    };

    const endOfPeriod: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    };
  }

  getDomainColor(domain: string): EventColor {
    switch (domain) {
      case 'Cyber': {
        return colors.red;
      }
      case 'Tactical Transmission': {
        return colors.blue;
      }
      case 'Routing & Networking': {
        return colors.yellow;
      }
      case 'Fielding & Sustainment': {
        return colors.purple;
      }
      default: {
        return {
          primary: '#333333',
          secondary: '#dddddd'
        };
      }
    }
  }

  addEvent(calevent: CalendarEvent): void {
    this.calendarEvents.push(calevent);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
