import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { EventService } from '../services/event/event.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  existingEvents: CalendarEvent[] = [];
  errors: string[] = [];

  event: CalendarEvent;
  minDate = new Date(Date.now());

  startTimeHolder: string | undefined;
  endTimeHolder: string | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent, private eventService: EventService, private dialogRef: MatDialogRef<EventComponent>) {
    if (data) {
      this.event = data;
    } else {
      this.event = {} as CalendarEvent;
    }
  }

  ngOnInit(): void {
    this.fetchExistingEvents();
  }

  saveEvent() {
    if (this.event.start) {
      this.event.start.setHours(Number(this.startTimeHolder?.substring(0, 2)), Number(this.startTimeHolder?.substring(3, 5)));
      this.event.end = new Date(this.event.start);
      this.event.end.setHours(Number(this.endTimeHolder?.substring(0, 2)), Number(this.endTimeHolder?.substring(3, 5)));
    }
    this.clearErrors();
    if (this.validateEvent()) {
      this.dialogRef.close(this.event);
    }
  }

  deleteEvent() { }

  cancel() {
    this.dialogRef.close();
  }

  private validateEvent() {
    var result = true;
    if (!this.event.title) {
      result = false;
      this.errors.push("Title is required.");
    }

    if (!this.event.start) {
      result = false;
      this.errors.push("Date is required.")
    } else {
      if (!this.validateDays()){
        this.errors.push("Date must be Monday - Friday.");
        result = false;
      }
    }

    if (!this.startTimeHolder) {
      result = false;
      this.errors.push("Start time is required.")
    } 

    if (!this.endTimeHolder) {
      result = false;
      this.errors.push("End time is required.")
    }

    if (this.endTimeHolder && this.startTimeHolder){  
      if (!this.validateTimes()) {
        this.errors.push("Appointment must be between 9AM and 5PM.");
        result = false;
      }
    }

    if (this.event.start && this.event.end){
      if (this.checkForConflictsWithExistingEvents(this.event.start, this.event.end)){
        result = false;
      }
    }

    return result;
  }

  private validateTimes(): Boolean {
    return this.validateBetween9and5(this.event.start.getHours(), this.event.start.getMinutes()) && this.validateBetween9and5(this.event.end?.getHours() || 0, this.event.end?.getMinutes() || 0);
     
  }

  private validateBetween9and5(hour: number, minute: number) {
    return hour >= 9 && (hour < 17 || (hour === 17 && minute === 0));
  }

  private validateDays () {
    var day = this.event.start.getDay()
    return day > 0 && day < 6;
  }

  private clearErrors() {
    this.errors = [];
  }

  private fetchExistingEvents() {
    this.eventService.getEvents().pipe(take(1)).subscribe(events => {
      this.existingEvents = events;
    })
  }

  private checkForConflictsWithExistingEvents(startDate: Date, endDate: Date) {
    var hasConflicts = false;
    this.existingEvents.forEach(existingEvent => {
      if (this.doDatesOverlap(
        { start: startDate, end: endDate },
        { start: existingEvent.start, end: existingEvent.end!! }
      )){
        hasConflicts = true;
        this.errors.push(`Conflict: ${existingEvent.title} ${existingEvent.start.toDateString()} ${existingEvent.start.toTimeString()} - ${existingEvent.end?.toTimeString()}`)
      }
    });
    return hasConflicts;
    
  }

  private doDatesOverlap(first: {start: Date, end: Date}, second: {start: Date, end: Date}){
    return (first.start < second.end) && (second.start < first.end);
}

}
