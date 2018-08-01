import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {
  transform(items: any[], searchText: string, locationSelect: string): any[] {
    if (!items) { return []; }
    if (searchText && !locationSelect) {
      searchText = searchText.toLowerCase();
      return items.filter( it => {
        return it.title.toLowerCase().includes(searchText);
      });
    } else if (!searchText && locationSelect) {
      locationSelect = locationSelect.toLowerCase();
      return items.filter( it => {
        return it.meta.location.toLowerCase().includes(locationSelect);
      });
    } else if (!searchText && !locationSelect) {
      return items;
    } else {
      searchText = searchText.toLowerCase();
      locationSelect = locationSelect.toLowerCase();
      return items.filter( it => {
        return (it.title.toLowerCase().includes(searchText)).concat(it.meta.location.toLowerCase().includes(locationSelect));
      });
    }
   }
}
