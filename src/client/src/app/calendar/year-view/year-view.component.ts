import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calendar } from '../../_models/calendar.model';

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrl: './year-view.component.css'
})
export class YearViewComponent {
  @Input() years: number[];
  @Input() currentYear: number;
  @Output() calendarDataChange: EventEmitter<Calendar> = new EventEmitter<Calendar>();

  selectYear(year: number): void {
    const calendarData: Calendar = {
      year: year,
      month: '',
      monthIndex: null,
      view: 'month' 
    };

    this.calendarDataChange.emit(calendarData);
  }
}
