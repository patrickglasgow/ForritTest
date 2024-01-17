import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date/date.service';
import { CalendarEvent } from 'angular-calendar';
import { take } from 'rxjs';
import { EventComponent } from '../event/event.component';
import { EventService } from '../services/event/event.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dateService: DateService,
    private eventService: EventService,
    public dialog: MatDialog) { }

  currentMonth = this.dateService.getCurrentMonth()

  ngOnInit(): void {
  }

  addNewEvent() {
    const dialogRef = this.dialog.open(EventComponent, {
      restoreFocus: false,
      width: '500px',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: CalendarEvent) => {
      if (result) {
        this.eventService.addEvent(result);
      }
    });
  }

}
