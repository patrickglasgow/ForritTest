import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private currentDate = new BehaviorSubject<Dayjs| null>(null);

  constructor() { }

  getCurrentDate(): Observable<Dayjs|null> {
    return this.currentDate.asObservable();
  }

  setCurrentDate(date: Dayjs) {
    this.currentDate.next(date);
  }
  
}
