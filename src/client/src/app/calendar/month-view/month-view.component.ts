import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar } from '../../_models/calendar.model';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.css'
})
export class MonthViewComponent implements OnInit {
  
  @Input() years: number[] = [];
  @Input() currentYear: number;
  @Input() calendarData: Calendar | null = null;
  @Output() calendarDataChange: EventEmitter<Calendar> = new EventEmitter<Calendar>();
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit(): void { }

  selectMonth(month: string, index: number): void {
    if (this.calendarData) {
      const newCalendarData: Calendar = {
        year: this.calendarData.year,
        month: month,
        monthIndex: index,
        view: 'week'
      };
      this.calendarDataChange.emit(newCalendarData);
    }
  }

  onYearChange(year: number): void {
    const calendarData: Calendar = {
      year: year,
      month: '',
      monthIndex: null,
      view: 'month' 
    };

    this.calendarDataChange.emit(calendarData);
  }
}
