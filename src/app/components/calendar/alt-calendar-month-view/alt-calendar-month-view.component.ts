import { OnChanges, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy, TemplateRef,
  Component, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { CalendarEvent, WeekDay, MonthView, MonthViewDay, ViewPeriod, getEventsInPeriod, DAYS_OF_WEEK  } from 'calendar-utils';
import { validateEvents, trackByIndex } from 'angular-calendar/modules/common/util';
import { Subject, Subscription } from 'rxjs';
import { CalendarEventTimesChangedEvent } from 'angular-calendar/modules/common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from 'angular-calendar/modules/common/calendar-utils.provider';
import { getDate, getMonth, getYear, setDate, setMonth, setYear, startOfDay,
  isSameDay, differenceInSeconds, addSeconds, startOfMonth, endOfMonth, addHours,
  endOfDay, getDay, isSameMonth, differenceInDays, addDays, max } from 'date-fns';

const DEFAULT_WEEKEND_DAYS = [
    DAYS_OF_WEEK.SUNDAY,
    DAYS_OF_WEEK.SATURDAY
];
const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 24;
const SECONDS_IN_DAY = 60 * 60 * 24;

export interface AltMonthView extends MonthView {
  /**
   * from MonthView:
   *    rowOffsets: number[];
   *    days: MonthViewDay[]; // Contains inMonth: boolean (true if start of event period is in current view month)
   *    totalDaysVisibleInWeek: number;
   *    period: ViewPeriod;
   */
  eventRows: AltMonthViewEventRow[];
}
  export interface AltMonthViewEventRow {
    row: AltMonthViewEvent[];
  }
    export interface AltMonthViewEvent {
      event: CalendarEvent;
      offset: number; // Number of seconds between start of event and start of month
      span: number; // Duration of event display in seconds
      startsBeforeMonth: boolean; // True if event start < month start
      endsAfterMonth: boolean; // True if event end > month end
    }

export interface CalendarMonthViewBeforeRenderEvent {
    header: WeekDay[];
    body: MonthViewDay[];
    period: ViewPeriod;
}
export interface CalendarMonthViewEventTimesChangedEvent extends CalendarEventTimesChangedEvent {
    day: MonthViewDay;
}
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <app-alt-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </app-alt-calendar-month-view>
 * ```
 */
@Component({
  selector: 'app-alt-calendar-month-view',
  templateUrl: 'alt-calendar-month-view.component.html',
  styleUrls: ['./alt-calendar-month-view.component.scss']
})
export class AltCalendarMonthViewComponent implements OnChanges, OnInit, OnDestroy {

  @Input() viewDate: Date; // The current view date
  @Input() events: CalendarEvent[];  // An array of events to display on view.
  @Input() excludeDays: number[];  // An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
  @Input() activeDayIsOpen: boolean; // Whether the events list for the day of the `viewDate` option is visible or not
  @Input() refresh: Subject<any>;  // An observable that when emitted on will re-render the current view
  @Input() locale: string; // The locale used to format dates
  @Input() tooltipPlacement: string; // The placement of the event tooltip
  @Input() tooltipTemplate: TemplateRef<any>;  // A custom template to use for the event tooltips
  @Input() tooltipAppendToBody: boolean; // Whether to append tooltips to the body or next to the trigger element
  @Input() weekStartsOn: number; // The start number of the week
  @Input() headerTemplate: TemplateRef<any>; // A custom template to use to replace the header
  @Input() cellTemplate: TemplateRef<any>; // A custom template to use to replace the day cell
  @Input() eventTemplate: TemplateRef<any>;  // A custom template to use for week view events
  @Input() eventTitleTemplate: TemplateRef<any>; // A custom template to use for event titles
  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes';
  @Input() weekendDays: number[];  // An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
  /**
   * An output that will be called before the view is rendered for the current month.
   * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
   */
  @Output() beforeViewRender: EventEmitter<CalendarMonthViewBeforeRenderEvent>;
  @Output() dayClicked: EventEmitter<{  // Called when the day cell is clicked
      day: MonthViewDay<any>;
  }>;
  @Output() eventClicked: EventEmitter<{  // Called when the event title is clicked
      event: CalendarEvent<any>;
  }>;
  @Output() eventTimesChanged: EventEmitter<CalendarMonthViewEventTimesChangedEvent>; // Called when an event is dragged and dropped
  /**
   * @hidden
   */
  columnHeaders: WeekDay[];
  /**
   * @hidden
   */
  view: AltMonthView;
  /**
   * @hidden
   */
  openRowIndex: number;
  /**
   * @hidden
   */
  openDay: MonthViewDay;
  /**
   * @hidden
   */
  refreshSubscription: Subscription;
  /**
   * @hidden
   */
  trackByIndex: (index: number) => number;
  /**
   * @hidden
   */
  trackByDate: (index: number, day: MonthViewDay<any>) => string;
  /**
   * @hidden
   */
  trackByEventId: (index: number, altMonthEvent: AltMonthViewEvent) => string | number | AltMonthViewEvent;
  /**
   * @hidden
   */
  private cdr;
  /**
   * @hidden
   */
  private utils;

  /**
   * @hidden
   */
  constructor(cdr: ChangeDetectorRef, utils: CalendarUtils, @Inject(LOCALE_ID) locale: string) {
    this.cdr = cdr;
    this.utils = utils;
    this.events = [];
    this.excludeDays = [];
    this.activeDayIsOpen = false;
    this.tooltipPlacement = 'top';
    this.tooltipAppendToBody = true;
    this.beforeViewRender = new EventEmitter();
    this.dayClicked = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.eventTimesChanged = new EventEmitter();
    this.locale = locale;
    this.trackByIndex = trackByIndex;
    this.trackByDate = (index, day) => day.date.toISOString();
  }

  /**
   * @hidden
   */
  ngOnInit(): void {
    const _this = this;
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        _this.refreshAll();
        _this.cdr.markForCheck();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {
    if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
      this.refreshHeader();
    }
    if (changes.events) {
      validateEvents(this.events);
    }
    if (changes.viewDate ||
        changes.events ||
        changes.excludeDays ||
        changes.weekendDays) {
      this.refreshBody();
    }
    if (changes.activeDayIsOpen ||
        changes.viewDate ||
        changes.events ||
        changes.excludeDays) {
      this.checkActiveDayIsOpen();
    }
  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  /**
   * @hidden
   */
  toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach(day => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = (event.color && event.color.secondary) || '#D1E8FF';
      }
      else {
        delete day.backgroundColor;
      }
    });
  }

  /**
   * @hidden
   */
  eventDropped(day: MonthViewDay, event: CalendarEvent): void {
    const year = getYear(day.date);
    const month = getMonth(day.date);
    const date = getDate(day.date);
    const newStart = setDate(setMonth(setYear(event.start, year), month), date);
    let newEnd;
    if (event.end) {
      const secondsDiff = differenceInSeconds(newStart, event.start);
      newEnd = addSeconds(event.end, secondsDiff);
    }
    this.eventTimesChanged.emit({ event: event, newStart: newStart, newEnd: newEnd, day: day });
  }

  /**
   * @hidden
   */
  handleDayClick(clickEvent: any, day: MonthViewDay): void {
    // when using hammerjs, stopPropagation doesn't work. See https://github.com/mattlewis92/angular-calendar/issues/318
    if (!clickEvent.target.classList.contains('cal-event')) {
      this.dayClicked.emit({ day: day });
    }
  }

  private refreshHeader() {
    this.columnHeaders = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
    this.emitBeforeViewRender();
  }

  private refreshBody() {
    this.view = this.getAltMonthView({
                  events: this.events,
                  viewDate: this.viewDate,
                  weekStartsOn: this.weekStartsOn,
                  excluded: this.excludeDays,
                  precision: this.precision
                });
    this.emitBeforeViewRender();
  }

  private checkActiveDayIsOpen() {
    const _this = this;
    if (this.activeDayIsOpen === true) {
      this.openDay = this.view.days.find(day => {
        return isSameDay(day.date, _this.viewDate);
      });
      const index = this.view.days.indexOf(this.openDay);
      this.openRowIndex =
        Math.floor(index / this.view.totalDaysVisibleInWeek) * this.view.totalDaysVisibleInWeek;
    }
    else {
      this.openRowIndex = null;
      this.openDay = null;
    }
  }

  private refreshAll() {
    this.columnHeaders = null;
    this.view = null;
    this.refreshHeader();
    this.refreshBody();
    this.checkActiveDayIsOpen();
  }

  private emitBeforeViewRender() {
    if (this.columnHeaders && this.view) {
      this.beforeViewRender.emit({
        header: this.columnHeaders,
        body: this.view.days,
        period: this.view.period
      });
    }
  }

  private getAltMonthView(_a: {
                            events?: CalendarEvent[],
                            viewDate: Date,
                            weekStartsOn: number,
                            excluded?: number[],
                            viewStart?: Date,
                            viewEnd?: Date,
                            weekendDays?: number[],
                            precision?: 'minutes' | 'days';
                          }): AltMonthView {
    const _b = _a.events,
    viewDate = _a.viewDate,
    weekStartsOn = _a.weekStartsOn,
    _c = _a.excluded,
    excluded = _c === void 0 ? [] : _c,
    _d = _a.viewStart,
    viewStart = _d === void 0 ? startOfMonth(viewDate) : _d,
    _e = _a.viewEnd,
    viewEnd = _e === void 0 ? endOfMonth(viewDate) : _e,
    _f = _a.weekendDays,
    weekendDays = _f === void 0 ? DEFAULT_WEEKEND_DAYS : _f,
    _g = _a.precision,
    precision = _g === void 0 ? 'days' : _g;
    let events = _b === void 0 ? [] : _b;

    if (!events) {
      events = [];
    }
    const eventsInMonth = getEventsInPeriod({
      events: events,
      periodStart: viewStart,
      periodEnd: viewEnd
    });
    const initialViewDays = [];
    let previousDate;
    let eventsInPeriod;
    const _loop_3 = () => {
      // hacky fix for https://github.com/mattlewis92/angular-calendar/issues/173
      let date;
      if (previousDate) {
        date = startOfDay(addHours(previousDate, HOURS_IN_DAY));
        if (previousDate.getTime() === date.getTime()) {
          // DST change, so need to add 25 hours
          date = startOfDay(addHours(previousDate, HOURS_IN_DAY + 1));
        }
        previousDate = date;
      }
      else {
        date = previousDate = viewStart;
      }
      if (!excluded.some(e => (date.getDay() === e))) {
        const today = startOfDay(new Date());
        eventsInPeriod = getEventsInPeriod({
          events: eventsInMonth,
          periodStart: startOfDay(date),
          periodEnd: endOfDay(date)
        });
        const day = {
          date: date,
          isPast: date < today,
          isToday: isSameDay(date, today),
          isFuture: date > today,
          isWeekend: weekendDays.indexOf(getDay(date)) > -1,
          inMonth: isSameMonth(date, viewDate),
          events: eventsInPeriod,
          badgeTotal: eventsInPeriod.length
        };
        initialViewDays.push(day);
      }
    };

    for (let i = 0; i < differenceInDays(viewEnd, viewStart) + 1; i++) {
      _loop_3();
    }
    let days = [];
    const totalDaysVisibleInWeek = DAYS_IN_WEEK - excluded.length;
    if (totalDaysVisibleInWeek < DAYS_IN_WEEK) {
      for (let i = 0; i < initialViewDays.length; i += totalDaysVisibleInWeek) {
        const row = initialViewDays.slice(i, i + totalDaysVisibleInWeek);
        const isRowInMonth = row.some(day => (day.date.getMonth() === viewDate.getMonth()));
        if (isRowInMonth) {
          days = days.concat(row);
        }
      }
    }
    else {
      days = initialViewDays;
    }
    const rows = Math.ceil(days.length / totalDaysVisibleInWeek);
    const rowOffsets = [];
    for (let i = 0; i < rows; i++) {
      rowOffsets.push(i * totalDaysVisibleInWeek);
    }

    // =========================================================================
    // Start logic pulled from getWeekView()
    // =========================================================================

    const maxRange = days.length - excluded.length;
    const absolutePositionedEvents = true;
    const eventsMapped = eventsInPeriod
      .map(event => {
            const offset = this.getAltMonthViewEventOffset({
                            event: event,
                            startOfMonth: viewStart,
                            excluded: excluded,
                            precision: precision
                          });
            const span = this.getAltMonthViewEventSpan({
                            event: event,
                            offset: offset,
                            startOfMonth: viewStart,
                            excluded: excluded,
                            precision: precision,
                            SECONDS_IN_MONTH: days.length * SECONDS_IN_DAY
                          });
            return { event: event, offset: offset, span: span };
          })
      .filter(e => (e.offset < maxRange))
      .filter(e => (e.span > 0))
      .map(entry => { return ({
                        event: entry.event,
                        offset: entry.offset,
                        span: entry.span,
                        startsBeforeMonth: entry.event.start < viewStart,
                        endsAfterMonth: (entry.event.end || entry.event.start) > viewEnd
                      });
      })
      .sort((itemA, itemB) => {
              const startSecondsDiff = differenceInSeconds(itemA.event.start, itemB.event.start);
              if (startSecondsDiff === 0) {
                return differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
              }
              return startSecondsDiff;
      });
    // eventsMapped is not populating
    // console.log(eventsMapped);

    const eventRows = [];
    const allocatedEvents = [];
    eventsMapped.forEach((event, index) => {
      if (allocatedEvents.indexOf(event) === -1) {
        allocatedEvents.push(event);
        let rowSpan_1 = event.span + event.offset;
        const otherRowEvents = eventsMapped
          .slice(index + 1)
          .filter(nextEvent => {
            if (nextEvent.offset >= rowSpan_1 &&
                rowSpan_1 + nextEvent.span <= days.length &&
                allocatedEvents.indexOf(nextEvent) === -1) {
              const nextEventOffset = nextEvent.offset - rowSpan_1;
              if (!absolutePositionedEvents) {
                nextEvent.offset = nextEventOffset;
              }
              rowSpan_1 += nextEvent.span + nextEventOffset;
              allocatedEvents.push(nextEvent);
              return true;
            }
          });

        eventRows.push({
          row: [event].concat(otherRowEvents)
        });
      }
    });
    console.log(eventRows);

    return {
      rowOffsets: rowOffsets,
      totalDaysVisibleInWeek: totalDaysVisibleInWeek,
      days: days,
      period: {
        start: viewStart,
        end: viewEnd,
        events: eventsInMonth
      },
      eventRows: eventRows
    };
  }

  private getAltMonthViewEventOffset(_a: {
                                        event: CalendarEvent;
                                        startOfMonth: Date;
                                        excluded?: number[];
                                        precision?: 'minutes' | 'days';
                                      }): number {
    const event = _a.event,
    startOfViewDate = _a.startOfMonth,
    _b = _a.excluded,
    excluded = _b === void 0 ? [] : _b,
    _c = _a.precision,
    precision = _c === void 0 ? 'days' : _c;

    if (event.start < startOfViewDate) {
      return 0;
    }
    let offset = 0;
    switch (precision) {
      case 'days':
        offset = differenceInDays(startOfDay(event.start), startOfViewDate) * SECONDS_IN_DAY;
        break;
      case 'minutes':
        offset = differenceInSeconds(event.start, startOfViewDate);
        break;
    }
    offset -= this.getExcludedSeconds({
      startDate: startOfViewDate,
      seconds: offset,
      excluded: excluded,
      precision: precision
    });

    return offset / SECONDS_IN_DAY;
  }

  private getExcludedSeconds(_a) {
    const startDate = _a.startDate,
    seconds = _a.seconds,
    excluded = _a.excluded,
    _b = _a.precision,
    precision = _b === void 0 ? 'days' : _b;

    if (excluded.length < 1) {
      return 0;
    }
    const endDate = addSeconds(startDate, seconds - 1);
    const dayStart = getDay(startDate);
    const dayEnd = getDay(endDate);
    let result = 0; // Calculated in seconds
    let current = startDate;
    const _loop_1 = () => {
      const day = getDay(current);
        if (excluded.some(excludedDay => (excludedDay === day))) {
          result += this.calculateExcludedSeconds({
                      dayStart: dayStart,
                      dayEnd: dayEnd,
                      day: day,
                      precision: precision,
                      startDate: startDate,
                      endDate: endDate
                    });
        }
        current = addDays(current, 1);
    };
    while (current < endDate) {
        _loop_1();
    }
    return result;
  }

  private calculateExcludedSeconds(_a) {
    const precision = _a.precision,
    day = _a.day,
    dayStart = _a.dayStart,
    dayEnd = _a.dayEnd,
    startDate = _a.startDate,
    endDate = _a.endDate;

    if (precision === 'minutes') {
      if (day === dayStart) {
        return differenceInSeconds(endOfDay(startDate), startDate) + 1;
      }
      else if (day === dayEnd) {
        return differenceInSeconds(endDate, startOfDay(endDate)) + 1;
      }
    }
    return SECONDS_IN_DAY;
  }

  private getAltMonthViewEventSpan(_a) {
    const event = _a.event,
    offset = _a.offset,
    startOfViewDate = _a.startOfMonth,
    excluded = _a.excluded,
    _b = _a.precision,
    precision = _b === void 0 ? 'days' : _b,
    SECONDS_IN_MONTH = _a.SECONDS_IN_MONTH;

    let span = SECONDS_IN_DAY;
    const begin = max(event.start, startOfViewDate);

    if (event.end) {
      switch (precision) {
        case 'minutes':
          span = differenceInSeconds(event.end, begin);
          break;
        default:
          span = differenceInDays(addDays(endOfDay(event.end), 1), begin) * SECONDS_IN_DAY;
          break;
      }
    }
    const offsetSeconds = offset * SECONDS_IN_DAY;
    const totalLength = offsetSeconds + span;
    // the best way to detect if an event is outside the week-view
    // is to check if the total span beginning (from startOfWeekDay or event start) exceeds 7days
    if (totalLength > SECONDS_IN_MONTH) {
      span = SECONDS_IN_MONTH - offsetSeconds;
    }
    span -= this.getExcludedSeconds({
              startDate: begin,
              seconds: span,
              excluded: excluded,
              precision: precision
            });
    return span / SECONDS_IN_DAY;
  }
}
