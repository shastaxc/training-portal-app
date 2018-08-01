import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { MaterialModule } from '../../../modules/material.module';
import { FilterEventsPipe } from './filter-events.pipe';
import { FilterLocationsPipe } from './filter-locations.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule, MaterialModule, BrowserModule],
  declarations: [CalendarHeaderComponent, FilterEventsPipe, FilterLocationsPipe ],
  exports: [CalendarHeaderComponent, FilterEventsPipe, FilterLocationsPipe ],
  providers: [FilterEventsPipe, FilterLocationsPipe]
})
export class CalUtilsModule {}
