import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date/date.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { EventService } from '../services/event/event.service';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-calender-container',
  templateUrl: './calender-container.component.html',
  styleUrls: ['./calender-container.component.css']
})
export class CalenderContainerComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject();

  viewDate: Date = new Date();
  excludeDays: number[] = [0, 6];

  eventSubscription: Observable<CalendarEvent[]> = this.eventService.getEvents();

  constructor(
    private dateService: DateService,
    private eventService: EventService,
    public dialog: MatDialog) {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.subscribeToDateChange();
    this.eventSubscription.subscribe(x =>
      console.log(x))
  }

  subscribeToDateChange() {
    this.dateService.getCurrentMonth().pipe(
      takeUntil(this.ngUnsubscribe.asObservable()),
    ).subscribe(datejs => {
      if (datejs){
        this.viewDate = datejs.toDate()
      }
    });
  }


}
