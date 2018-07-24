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
import { RRule } from 'rrule';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { colors } from './cal-utils/colors';
import { CalendarEventActionsComponent } from '../../../../node_modules/angular-calendar/modules/common/calendar-event-actions.component';

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: RRule.Frequency;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: RRule.Weekday[];
  };
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: string = 'month';

  viewDate: Date = new Date();

  recurringEvents: RecurringEvent[] = [/*
    {
      title: 'Recurs on the 5th of each month',
      color: colors.yellow,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: 5
      }
    },
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: getMonth(new Date()) + 1,
        bymonthday: 10
      }
    },
    {
      title: 'Recurs weekly on mondays',
      color: colors.red,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO]
      }
    }*/
  ];

  calendarEvents: CalendarEvent[] = [
    {
      start: new Date('01OCT2018'),
      end: new Date('05OCT2018'),
      title: 'Certified Ethical Hacker (CEH)',
      color: colors.red
    },
    {
      start: new Date('01OCT2018'),
      end: new Date('05OCT2018'),
      title: 'Cisco Certified Network Associate Security (CCNA-Security)',
      color: colors.red
    },
    {
      start: new Date('15OCT2018'),
      end: new Date('19OCT2018'),
      title: 'Basic IT',
      color: colors.blue
    },
    {
      start: new Date('09OCT2018'),
      end: new Date('19OCT2018'),
      title: 'CC STT',
      color: colors.yellow
    }
  ];

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = 0;
    });
  }

  ngOnInit(): void {
    this.updateCalendarEvents();
  }

  updateCalendarEvents(): void {
    // this.calendarEvents = [];

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

    this.recurringEvents.forEach(event => {
      const rule: RRule = new RRule(
        Object.assign({}, event.rrule, {
          dtstart: startOfPeriod[this.view](this.viewDate),
          until: endOfPeriod[this.view](this.viewDate)
        })
      );

      rule.all().forEach(date => {
        this.calendarEvents.push(
          Object.assign({}, event, {
            start: new Date(date)
          })
        );
      });
    });
  }
}
