import { Component, Input } from '@angular/core';
import { Appointment } from '../../_models/appointment.model';
import { AppointmentService } from '../../_services/appointment.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.css'
})
export class DayViewComponent {
  @Input() currentDate: string; // Expecting date in 'YYYY-MM-DD' format
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const allAppointments = this.appointmentService.getAppointments();
    this.appointments = allAppointments.filter(appointment => appointment.date === this.currentDate);
  }
}
