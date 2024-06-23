import { Injectable } from '@angular/core';
import { Appointment } from '../_models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private storageKey = 'appointments';

  constructor() { }

  getAppointments(): Appointment[] {
    const appointments = localStorage.getItem(this.storageKey);
    return appointments ? JSON.parse(appointments) : [];
  }

  saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }

  addAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    this.saveAppointments(appointments);
  }

  updateAppointment(updatedAppointment: Appointment): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(appointment => appointment.id === updatedAppointment.id);
    if (index > -1) {
      appointments[index] = updatedAppointment;
      this.saveAppointments(appointments);
    }
  }

  deleteAppointment(id: number): void {
    let appointments = this.getAppointments();
    appointments = appointments.filter(appointment => appointment.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }

  moveAppointment(id: number, newDate: string, newTime: string): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index > -1) {
      appointments[index].date = newDate;
      appointments[index].time = newTime;
      localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }
  }
}