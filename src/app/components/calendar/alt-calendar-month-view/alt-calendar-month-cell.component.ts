import { Component, Input, Output, EventEmitter, TemplateRef, HostBinding } from '@angular/core';
import { MonthViewDay, CalendarEvent } from 'calendar-utils';
import { trackByEventId } from 'angular-calendar/modules/common/util';

@Component({
  selector: 'app-alt-calendar-month-cell',
  templateUrl: 'alt-calendar-month-cell.component.html',
  styleUrls: ['./alt-calendar-month-cell.component.scss']
})
export class AltCalendarMonthCellComponent {

  @Input() day: MonthViewDay;
  @Input() openDay: MonthViewDay;
  @Input() locale: string;
  @Input() tooltipPlacement: string;
  @Input() tooltipAppendToBody: boolean;
  @Input() customTemplate: TemplateRef<any>;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Output() highlightDay: EventEmitter<any>;
  @Output() unhighlightDay: EventEmitter<any>;
  @Output() eventClicked: EventEmitter<{
    event: CalendarEvent;
  }>;

  @HostBinding('class') classes = 'cal-cell cal-day-cell';
  @HostBinding('class.cal-past') public get isPast(): Boolean { return this.day.isPast; }
  @HostBinding('class.cal-today') public get isToday(): Boolean { return this.day.isToday; }
  @HostBinding('class.cal-future') public get isFuture(): Boolean { return this.day.isFuture; }
  @HostBinding('class.cal-weekend') public get isWeekend(): Boolean { return this.day.isWeekend; }
  @HostBinding('class.cal-in-month') public get isInMonth(): Boolean { return this.day.inMonth; }
  @HostBinding('class.cal-out-month') public get isOutMonth(): Boolean { return !this.day.inMonth; }
  @HostBinding('class.cal-has-events') public get hasEvents(): Boolean { return this.day.events.length > 0; }
  @HostBinding('class.cal-open') public get isOpen(): Boolean { return this.day === this.openDay; }
  @HostBinding('style.backgroundColor') public get getBgColor(): string { return this.day.backgroundColor; }

  trackByEventId: (index: number, event: CalendarEvent<any>) => string | number | CalendarEvent<any>;

  constructor() {
    this.highlightDay = new EventEmitter();
    this.unhighlightDay = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.trackByEventId = trackByEventId;
  }
}
