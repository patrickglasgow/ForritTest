import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { DateService } from './services/date/date.service';
import { EventService } from './services/event/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dateService: DateService, private eventService: EventService) {}

  ngOnInit() {
    this.dateService.setCurrentDate(dayjs());
    this.eventService.loadEventsFromLocalStorage();
  }
}
