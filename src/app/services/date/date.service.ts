import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private currentMonth = new BehaviorSubject<Dayjs | null>(null);

  constructor() { }

  getCurrentMonth(): Observable<Dayjs | null> {
    return this.currentMonth.asObservable();
  }

  setCurrentDate(date: Dayjs) {
    this.currentMonth.next(date.startOf("month"));
  }

  nextMonth() {
    if (this.currentMonth.value) {
      this.currentMonth.next(this.currentMonth.value.add(1, "month"));
    }
  }

  previousMonth() {
    if (this.currentMonth.value) {
      this.currentMonth.next(this.currentMonth.value.subtract(1, "month"));
    }
  }

}
