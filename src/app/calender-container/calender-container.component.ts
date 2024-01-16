import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date/date.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calender-container',
  templateUrl: './calender-container.component.html',
  styleUrls: ['./calender-container.component.css']
})
export class CalenderContainerComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject();

  viewDate: Date = new Date();
  excludeDays: number[] = [0, 6];

  constructor(private dateService: DateService) {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  ngOnInit(): void {
    this.subscribeToDateChange();
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
