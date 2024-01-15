import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { DateService } from './services/date/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.dateService.setCurrentDate(dayjs())
  }
}
