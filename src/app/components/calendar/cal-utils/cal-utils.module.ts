import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { MaterialModule } from '../../../modules/material.module';
import { FilterPipe } from './filter-events.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule, MaterialModule, BrowserModule],
  declarations: [CalendarHeaderComponent, FilterPipe],
  exports: [CalendarHeaderComponent, FilterPipe ]
})
export class CalUtilsModule {}
