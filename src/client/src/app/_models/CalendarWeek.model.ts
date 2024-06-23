export interface CalendarWeek {
    weekNumber: number;
    days: { date: number, isCurrentWeek: boolean, isCurrentMonth: boolean, isOutsideCurrentMonth: boolean }[];
  }
  