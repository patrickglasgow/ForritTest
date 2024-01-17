import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  errors: string[] = [];

  event: CalendarEvent;
  minDate = new Date(Date.now());

  startTimeHolder: string | undefined;
  endTimeHolder: string | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarEvent, private dialogRef: MatDialogRef<EventComponent>) {
    if (data) {
      this.event = data;
    } else {
      this.event = {} as CalendarEvent;
    }
  }

  ngOnInit(): void {
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

    return result;
  }

  private clearErrors() {
    this.errors = [];
  }

}
