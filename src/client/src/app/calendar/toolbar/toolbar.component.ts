import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  isSearchExpanded = false;
  activeTab = 0;

  toggleSearch() {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  closeSearch() {
    this.isSearchExpanded = false;
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const isClickInside = targetElement.closest('.search-bar') || targetElement.closest('.search-icon');

    if (!isClickInside && this.isSearchExpanded) {
      this.closeSearch();
    }
  }

  currentDate: Date;

  @Input() viewDate: Date = new Date();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {
    this.currentDate = new Date();
  }

  prevMonth() {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.viewDateChange.emit(newDate);
  }

  nextMonth() {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.viewDateChange.emit(newDate);
  }

}
