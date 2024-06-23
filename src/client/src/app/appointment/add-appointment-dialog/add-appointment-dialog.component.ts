import { Component, Inject } from '@angular/core';
import { Appointment } from '../../_models/appointment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrl: './add-appointment-dialog.component.css'
})
export class AddAppointmentDialogComponent {

  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: [{ value: data.date, disabled: true }, Validators.required],
      time: ['', Validators.required],
      description: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        id: Date.now(),
        title: this.appointmentForm.get('title').value,
        date: this.appointmentForm.get('date').value,
        time: this.appointmentForm.get('time').value,
        description: this.appointmentForm.get('description').value
      };
      this.dialogRef.close(appointment);
    }
  }
}
