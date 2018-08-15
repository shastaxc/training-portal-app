import { Component, Input, Output, LOCALE_ID, Inject, EventEmitter,
  ChangeDetectorRef, OnChanges, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WeekDay, CalendarEvent, WeekViewEvent, WeekView, ViewPeriod } from 'calendar-utils';
import { ResizeEvent } from 'angular-resizable-element';
import { CalendarEventTimesChangedEvent } from 'angular-calendar/modules/common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from 'angular-calendar/modules/common/calendar-utils.provider';
import { addDays } from 'date-fns';
import { CalendarDragHelper } from 'angular-calendar/modules/common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from 'angular-calendar/modules/common/calendar-resize-helper.provider';
import { validateEvents, trackByIndex } from 'angular-calendar/modules/common/util';


export interface WeekView {
  period: ViewPeriod;
  eventRows: WeekViewEventRow[];
}
  export interface WeekViewEventRow {
    row: WeekViewEvent[];
  }
    export interface WeekViewEvent {
        event: CalendarEvent;
        offset: number;
        span: number;
        startsBeforeWeek: boolean;
        endsAfterWeek: boolean;
    }
  export interface ViewPeriod {
    start: Date;
    end: Date;
    events: CalendarEvent[];
  }

export interface WeekViewEventResize {
    originalOffset: number;
    originalSpan: number;
    edge: string;
}
export interface CalendarWeekViewBeforeRenderEvent {
    header: WeekDay[];
    period: ViewPeriod;
}
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <app-mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </app-mwl-calendar-week-view>
 * ```
 */
export class AppCalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy {
  private cdr;
  private utils;
  viewDate: Date; // The current view date
  events: CalendarEvent[];  // An array of events to display on view
  excludeDays: number[];  // An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
  refresh: Subject<any>;  // An observable that when emitted on will re-render the current view
  locale: string; // The locale used to format dates
  tooltipPlacement: string; // The placement of the event tooltip
  tooltipTemplate: TemplateRef<any>;  // A custom template to use for the event tooltips
  tooltipAppendToBody: boolean; // Whether to append tooltips to the body or next to the trigger element
  weekStartsOn: number; // The start number of the week
  headerTemplate: TemplateRef<any>; // A custom template to use to replace the header
  eventTemplate: TemplateRef<any>;  // A custom template to use for week view events
  eventTitleTemplate: TemplateRef<any>; // A custom template to use for event titles
  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  precision: 'days' | 'minutes';
  weekendDays: number[];  // An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
  /**
   * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
   */
  dayHeaderClicked: EventEmitter<{
      day: WeekDay;
  }>;
  /**
   * Called when the event title is clicked
   */
  eventClicked: EventEmitter<{
      event: CalendarEvent;
  }>;
  /**
   * Called when an event is resized or dragged and dropped
   */
  eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent>;
  /**
   * An output that will be called before the view is rendered for the current week.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  beforeViewRender: EventEmitter<CalendarWeekViewBeforeRenderEvent>;
  /**
   * @hidden
   */
  days: WeekDay[];
  /**
   * @hidden
   */
  view: WeekView;
  /**
   * @hidden
   */
  refreshSubscription: Subscription;
  /**
   * @hidden
   */
  currentResizes: Map<WeekViewEvent, WeekViewEventResize>;
  /**
   * @hidden
   */
  validateDrag: (args: any) => boolean;
  /**
   * @hidden
   */
  validateResize: (args: any) => boolean;
  /**
   * @hidden
   */
  dayColumnWidth: number;
  /**
   * @hidden
   */
  trackByIndex: (index: number) => number;
  /**
   * @hidden
   */
  trackByEventId: (index: number, weekEvent: WeekViewEvent) => string | number | WeekViewEvent;
  /**
   * @hidden
   */
  constructor(cdr: ChangeDetectorRef, utils: CalendarUtils, @Inject(LOCALE_ID) locale: string) {
    this.cdr = cdr;
    this.utils = utils;
    this.events = [];
    this.excludeDays = [];
    this.tooltipPlacement = 'bottom';
    this.tooltipAppendToBody = true;
    this.precision = 'days';
    this.dayHeaderClicked = new EventEmitter();
    this.eventClicked = new EventEmitter();
    this.eventTimesChanged = new EventEmitter();
    this.beforeViewRender = new EventEmitter();
    this.currentResizes = new Map();
    this.trackByIndex = trackByIndex;
    this.trackByEventId = function (index, weekEvent) {
      return weekEvent.event.id ? weekEvent.event.id : weekEvent;
    };
    this.locale = locale;
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
    if (changes.events || changes.viewDate || changes.excludeDays) {
      this.refreshBody();
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
  resizeStarted(weekViewContainer: HTMLElement, weekEvent: WeekViewEvent, resizeEvent: ResizeEvent): void {
    this.currentResizes.set(weekEvent, {
      originalOffset: weekEvent.offset,
      originalSpan: weekEvent.span,
      edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
    });
    this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
    const resizeHelper = new CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
    this.validateResize = function (_a) {
      const rectangle = _a.rectangle;
      return resizeHelper.validateResize({ rectangle: rectangle });
    };
    this.cdr.markForCheck();
  }
  /**
   * @hidden
   */
  resizing(weekEvent: WeekViewEvent, resizeEvent: ResizeEvent, dayWidth: number): void {
    const currentResize = this.currentResizes.get(weekEvent);
    if (resizeEvent.edges.left) {
      const diff = Math.round(+resizeEvent.edges.left / dayWidth);
      weekEvent.offset = currentResize.originalOffset + diff;
      weekEvent.span = currentResize.originalSpan - diff;
    }
    else if (resizeEvent.edges.right) {
      const diff = Math.round(+resizeEvent.edges.right / dayWidth);
      weekEvent.span = currentResize.originalSpan + diff;
    }
  }
  /**
   * @hidden
   */
  resizeEnded(weekEvent: WeekViewEvent): void {
    const currentResize = this.currentResizes.get(weekEvent);
    let daysDiff;
    if (currentResize.edge === 'left') {
      daysDiff = weekEvent.offset - currentResize.originalOffset;
    }
    else {
      daysDiff = weekEvent.span - currentResize.originalSpan;
    }
    weekEvent.offset = currentResize.originalOffset;
    weekEvent.span = currentResize.originalSpan;
    let newStart = weekEvent.event.start;
    let newEnd = weekEvent.event.end;
    if (currentResize.edge === 'left') {
      newStart = addDays(newStart, daysDiff);
    }
    else if (newEnd) {
      newEnd = addDays(newEnd, daysDiff);
    }
    this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
    this.currentResizes.delete(weekEvent);
  }
  /**
   * @hidden
   */
  eventDragged(weekEvent: WeekViewEvent, draggedByPx: number, dayWidth: number): void {
    const daysDragged = draggedByPx / dayWidth;
    const newStart = addDays(weekEvent.event.start, daysDragged);
    let newEnd;
    if (weekEvent.event.end) {
      newEnd = addDays(weekEvent.event.end, daysDragged);
    }
    this.eventTimesChanged.emit({ newStart: newStart, newEnd: newEnd, event: weekEvent.event });
  }
  /**
   * @hidden
   */
  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }
  /**
   * @hidden
   */
  dragStart(weekViewContainer: HTMLElement, event: HTMLElement): void {
    const _this = this;
    this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
    const dragHelper = new CalendarDragHelper(weekViewContainer, event);
    this.validateDrag = function (_a) {
      const x = _a.x, y = _a.y;
      return _this.currentResizes.size === 0 && dragHelper.validateDrag({ x: x, y: y });
    };
    this.cdr.markForCheck();
  }

  private refreshHeader() {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
    this.emitBeforeViewRender();
  }

  private refreshBody() {
    this.view = this.utils.getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true
    });
    this.emitBeforeViewRender();
  }

  private refreshAll() {
    this.refreshHeader();
    this.refreshBody();
  }

  private emitBeforeViewRender() {
    if (this.days && this.view) {
      this.beforeViewRender.emit({
        header: this.days,
        period: this.view.period
      });
    }
  }
}
