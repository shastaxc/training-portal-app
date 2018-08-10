import { OnChanges, EventEmitter, ChangeDetectorRef, OnInit, OnDestroy, TemplateRef,
  Component, Input, Output, Inject, LOCALE_ID } from '@angular/core';
import { CalendarEvent, WeekDay, MonthView, MonthViewDay, ViewPeriod } from 'calendar-utils';
import { validateEvents, trackByIndex } from 'angular-calendar/modules/common/util';
import { Subject, Subscription } from 'rxjs';
import { CalendarEventTimesChangedEvent } from 'angular-calendar/modules/common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from 'angular-calendar/modules/common/calendar-utils.provider';
import { getDate, getMonth, getYear, setDate, setMonth, setYear, isSameDay, differenceInSeconds, addSeconds } from 'date-fns';

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
  @Input() openDayEventsTemplate: TemplateRef<any>;  // A custom template to use for the slide down box of events for the active day
  @Input() eventTitleTemplate: TemplateRef<any>; // A custom template to use for event titles
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
  view: MonthView;
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
    this.trackByDate = function (index, day) { return day.date.toISOString(); };
  }

  /**
   * @hidden
   */
  ngOnInit(): void {
    const _this = this;
    if (this.refresh) {
        this.refreshSubscription = this.refresh.subscribe(function () {
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
    this.view.days.forEach(function (day) {
      if (isHighlighted && day.events.indexOf(event) > -1) {
          day.backgroundColor =
              (event.color && event.color.secondary) || '#D1E8FF';
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
    this.view = this.utils.getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
    this.emitBeforeViewRender();
  }

  private checkActiveDayIsOpen() {
    const _this = this;
    if (this.activeDayIsOpen === true) {
        this.openDay = this.view.days.find(function (day) {
            return isSameDay(day.date, _this.viewDate);
        });
        const index = this.view.days.indexOf(this.openDay);
        this.openRowIndex =
            Math.floor(index / this.view.totalDaysVisibleInWeek) *
                this.view.totalDaysVisibleInWeek;
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

}
