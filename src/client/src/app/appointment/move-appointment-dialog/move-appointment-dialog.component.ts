import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-move-appointment-dialog',
  templateUrl: './move-appointment-dialog.component.html',
  styleUrl: './move-appointment-dialog.component.css'
})
export class MoveAppointmentDialogComponent {
  newDate: string;
  newTime: string;

  constructor(
    public dialogRef: MatDialogRef<MoveAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string, time: string }
  ) {
    this.newDate = data.date;
    this.newTime = data.time;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ newDate: this.newDate, newTime: this.newTime });
  }

}
