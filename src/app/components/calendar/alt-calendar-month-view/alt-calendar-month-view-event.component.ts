import { EventEmitter, TemplateRef, Component, Input, Output } from '@angular/core';
import { AltMonthViewEvent } from './alt-calendar-month-view.component';

@Component({
  selector: 'app-alt-calendar-month-view-event',
  templateUrl: 'alt-calendar-month-view-event.component.html',
  styleUrls: ['alt-calendar-month-view-event.component.scss']
})
export class AltCalendarMonthViewEventComponent {
  @Input() altMonthEvent: AltMonthViewEvent;
  @Input() tooltipPlacement: string;
  @Input() tooltipAppendToBody: boolean;
  @Input() customTemplate: TemplateRef<any>;
  @Input() eventTitleTemplate: TemplateRef<any>;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Output() eventClicked: EventEmitter<any>;

  constructor() {
    this.eventClicked = new EventEmitter();
  }
}
