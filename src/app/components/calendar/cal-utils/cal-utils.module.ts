import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../modules/material.module';

import { CalendarModule } from 'angular-calendar';
import { CalendarEventTitleFormatter } from 'angular-calendar/modules/common/calendar-event-title-formatter.provider';
import { CalendarDateFormatter } from 'angular-calendar/modules/common/calendar-date-formatter.provider';
import { CalendarUtils } from 'angular-calendar/modules/common/calendar-utils.provider';

import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { AltCalendarMonthViewHeaderComponent } from '../alt-calendar-month-view/alt-calendar-month-view-header.component';
import { AltCalendarMonthViewEventComponent } from '../alt-calendar-month-view/alt-calendar-month-view-event.component';
import { AltCalendarMonthViewComponent } from '../alt-calendar-month-view/alt-calendar-month-view.component';

import { FilterLocationsPipe } from './filter-locations.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    MaterialModule,
    BrowserModule
  ],
  declarations: [
    CalendarHeaderComponent,
    FilterLocationsPipe,
    AltCalendarMonthViewEventComponent,
    AltCalendarMonthViewHeaderComponent,
    AltCalendarMonthViewComponent
  ],
  exports: [
    CalendarHeaderComponent,
    FilterLocationsPipe,
    AltCalendarMonthViewEventComponent,
    AltCalendarMonthViewHeaderComponent,
    AltCalendarMonthViewComponent
  ],
  providers: [
    FilterLocationsPipe,
    CalendarEventTitleFormatter,
    CalendarDateFormatter,
    CalendarUtils
  ]
})
export class CalUtilsModule {}
