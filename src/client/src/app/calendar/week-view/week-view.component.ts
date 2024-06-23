import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendar } from '../../_models/calendar.model';
import { Appointment } from '../../_models/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../../_services/appointment.service';
import { AddAppointmentDialogComponent } from '../../appointment/add-appointment-dialog/add-appointment-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrl: './week-view.component.css'
})
export class WeekViewComponent implements OnInit {

  @Input() currentYear: number;
  @Input() calendarData: Calendar | null = null;
  @Output() calendarDataChange: EventEmitter<Calendar> = new EventEmitter<Calendar>();
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysOfMonth: { day: string, number: number }[];
  appointments: { [key: number]: Appointment[] } = {};

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {}

  ngOnInit(): void { 
    this.generateDaysOfMonth(this.calendarData.year, this.calendarData.monthIndex);
    this.loadAppointments();
  }
  

  generateDaysOfMonth(year: number, month: number): void {
    this.daysOfMonth = [];
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      this.daysOfMonth.push({ day: '', number: null });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysOfMonth.push({ day: this.daysOfWeek[(firstDayOfMonth + i - 1) % 7], number: i });
      if (!this.appointments[i]) {
        this.appointments[i] = [];
      }
    }
  }

  openAppointmentDialog(day: { day: string, number: number }): void {
    if (!day.number) return;

    const selectedDate = `${this.calendarData.year}-${String(this.calendarData.monthIndex).padStart(2, '0')}-${String(day.number).padStart(2, '0')}`;

    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '450px',
      data: { date: selectedDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newAppointment: Appointment = {
          id: Date.now(),
          title: result.title,
          date: result.date,
          time: result.time,
          description: result.description
        };
        this.appointmentService.addAppointment(newAppointment);
        this.loadAppointments();
      }
    });
  }

  loadAppointments(): void {
    const allAppointments = this.appointmentService.getAppointments();
    this.appointments = {};

    for (const appointment of allAppointments) {
      const appointmentDate = new Date(appointment.date);
      if (
        appointmentDate.getFullYear() === this.calendarData.year &&
        appointmentDate.getMonth() + 1 === this.calendarData.monthIndex
      ) {
        const day = appointmentDate.getDate();
        if (!this.appointments[day]) {
          this.appointments[day] = [];
        }
        this.appointments[day].push(appointment);
      }
    }
  }

  drop(event: CdkDragDrop<Appointment[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const movedAppointment = event.container.data[event.currentIndex];
      const newDate = this.getDateFromDayElement(event.container.element.nativeElement);
      movedAppointment.date = newDate;
      
      this.appointmentService.updateAppointment(movedAppointment);
    }

    this.loadAppointments()
  }

  private getDateFromDayElement(element: HTMLElement): string {
    const day = parseInt(element.querySelector('.day')?.textContent || '0', 10);
    return `${this.calendarData.year}-${String(this.calendarData.monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

}
