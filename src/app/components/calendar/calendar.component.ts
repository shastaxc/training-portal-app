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
  locationSelect: string;
  searchList: CalendarEvent[] = [];
  locationList: CalendarEvent[] = [];

  schedule: ScheduleEntry[] = scheduledata.default;

  view: string = 'month';

  viewDate: Date = new Date();  // Defaults to current date.
  calendarEvents: CalendarEvent[] = []; // Will change as filtered
  calendarEventsComplete: CalendarEvent[] = []; // Will not change

  ngOnInit(): void {
    this.schedule.forEach(entry => {  // Loops through JSON entries
      const calevent: CalendarEvent = {
        title: entry.title,
        start: new Date(entry.start),
        end: new Date(entry.end),
        color: this.getDomainColor(entry.domain),
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
    this.calendarEventsComplete.push(calevent);
    this.calendarEvents.push(calevent);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  onSearchChange(newSearch: string): void {
    if (!newSearch) {
      this.searchList = this.calendarEventsComplete;
    } else {
      this.searchList = this.calendarEventsComplete.filter( it => {
        return it.title.toLowerCase().includes(newSearch.toLowerCase());
      });
    }
    this.createFilteredList();
  }

  onLocationSelect(newLocation: string): void {
    this.locationSelect = newLocation;
    if (!newLocation) {
      this.locationList = this.calendarEventsComplete;
    } else {
      this.locationList = this.calendarEventsComplete.filter( it => {
        return it.meta.location.toLowerCase().includes(newLocation.toLowerCase());
      });
    }
    this.createFilteredList();
  }

  createFilteredList(): void {
    if (this.searchText && this.locationSelect) {
      this.calendarEvents = this.searchList.filter(value => -1 !== this.locationList.indexOf(value));
    } else if (this.searchText && !this.locationSelect) {
      this.calendarEvents = this.searchList;
    } else if (!this.searchText && this.locationSelect) {
      this.calendarEvents = this.locationList;
    } else if (!this.searchText && !this.locationSelect) {
      this.calendarEvents = this.calendarEventsComplete;
    }
  }
}
