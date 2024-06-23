import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../_models/appointment.model';
import { AppointmentService } from '../../_services/appointment.service';
import { Calendar } from '../../_models/calendar.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  @Input() calendarData: Calendar | null = null;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
    return;
    if (this.calendarData) {
      switch (this.calendarData.view) {
        case 'year':
          if (this.calendarData.year) {
          }
          break;
        case 'month':
          if (this.calendarData.year && this.calendarData.monthIndex !== undefined) {
            this.appointments = this.appointmentService.getAppointments().filter(appointment =>
              new Date(appointment.date).getFullYear() === this.calendarData.year
            );
          }
          break;
        case 'week':
          if (this.calendarData.year && this.calendarData.monthIndex !== undefined) {
            this.appointments = this.appointmentService.getAppointments().filter(appointment =>
              new Date(appointment.date).getFullYear() === this.calendarData.year &&
              new Date(appointment.date).getMonth() === this.calendarData.monthIndex
            );
          }
          break;
        default:
          break;
      }
    }
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id);
    this.loadAppointments();
  }



}
