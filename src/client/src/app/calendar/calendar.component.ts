import { Component, OnInit } from '@angular/core';
import { Calendar } from '../_models/calendar.model';
import { DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { CalendarService } from '../_services/calendar.service';
import { CalendarWeek } from '../_models/CalendarWeek.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  constructor(public calendarService: CalendarService) {
    
  }

  ngOnInit() {
  }


}
