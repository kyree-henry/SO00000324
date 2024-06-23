import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { CalendarWeek } from '../_models/CalendarWeek.model';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    currentYear: number;
    currentMonth: number;
    currentDay: number;
    currentMonthName: string;
    currentWeekNumber: number;
    calendarWeeks: CalendarWeek[];
    daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    constructor(private dateAdapter: DateAdapter<Date>) {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.currentDay = today.getDate();
        this.currentWeekNumber = this.getWeekNumber(today);
        this.currentMonthName = this.getMonthName();
        this.calendarWeeks = this.getCalendarWeeks();
    }

    getCalendarWeeks(): CalendarWeek[] {
        const weeks: CalendarWeek[] = [];
        let date = new Date(this.currentYear, this.currentMonth, 1);

        // Get the number of days in the previous month
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();

        // Adjust the start of the week to Monday (ISO week date system)
        const startDay = date.getDay() === 0 ? 6 : date.getDay() - 1;

        let week: CalendarWeek = {
            weekNumber: this.getWeekNumber(date),
            days: []
        };

        // Fill the first week with leading days from the previous month
        for (let i = startDay - 1; i >= 0; i--) {
            week.days.push({
                date: prevMonthLastDay - i,
                isCurrentWeek: false,
                isCurrentMonth: false,
                isOutsideCurrentMonth: true
            });
        }

        while (date.getMonth() === this.currentMonth) {
            const weekNumber = this.getWeekNumber(date);
            if (week.days.length === 7) {
                weeks.push(week);
                week = { weekNumber, days: [] };
            }
            week.days.push({
                date: date.getDate(),
                isCurrentWeek: weekNumber === this.currentWeekNumber && this.currentYear === this.currentYear && this.currentMonth === this.currentMonth,
                isCurrentMonth: true,
                isOutsideCurrentMonth: false
            });
            date.setDate(date.getDate() + 1);
        }

        // Fill the last week with leading days from the next month
        const remainingDays = 7 - week.days.length;
        for (let i = 1; i <= remainingDays; i++) {
            week.days.push({
                date: i,
                isCurrentWeek: false,
                isCurrentMonth: false,
                isOutsideCurrentMonth: true
            });
        }
        weeks.push(week);

        return weeks;
    }

    getWeekNumber(d: Date): number {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d as any) - (yearStart as any)) / 86400000 + 1) / 7);
    }

    previousMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else {
            this.currentMonth--;
        }
        this.calendarWeeks = this.getCalendarWeeks();
        this.currentMonthName = this.getMonthName();
    }

    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else {
            this.currentMonth++;
        }
        this.calendarWeeks = this.getCalendarWeeks();
        this.currentMonthName = this.getMonthName();
    }

    private getMonthName(): string {
        const date = new Date(this.currentYear, this.currentMonth);
        const options = { month: 'long' } as const;
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

}