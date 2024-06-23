import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_modules/shared.module';
import { ToolbarComponent } from './calendar/toolbar/toolbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthViewComponent } from './calendar/month-view/month-view.component';
import { WeekViewComponent } from './calendar/week-view/week-view.component';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './appointment/appointment-details/appointment-details.component';
import { MoveAppointmentDialogComponent } from './appointment/move-appointment-dialog/move-appointment-dialog.component';
import { YearViewComponent } from './calendar/year-view/year-view.component';
import { AddAppointmentDialogComponent } from './appointment/add-appointment-dialog/add-appointment-dialog.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CalendarComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    AppointmentListComponent,
    AppointmentDetailsComponent,
    MoveAppointmentDialogComponent,
    YearViewComponent,
    AddAppointmentDialogComponent,
    MainWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
