import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {

  transform(items: CalendarEvent[]): any {
    if (!items) { return []; }

    return Array.from(new Set(items.map((item: CalendarEvent) => item.meta.location))).sort();
  }
}
