import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { BehaviorSubject } from 'rxjs';

const localStorageKey = 'events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events = new BehaviorSubject<CalendarEvent[]>([]);


  constructor() { }

  getEvents() {
    return this.events.asObservable();
  }

  addEvent(newEvent: CalendarEvent) {
    const listOfEvents = [...this.events.value];
    listOfEvents.push(newEvent);
    this.events.next(listOfEvents);
    this.saveEventsToLocalStorage(listOfEvents);
  }

  loadEventsFromLocalStorage() {
    var string = localStorage.getItem(localStorageKey);
    if (string){
      var parsedEvents = JSON.parse(string) as CalendarEvent[];
      if (parsedEvents) {
        this.events.next(parsedEvents);
      }
    }
  }

  saveEventsToLocalStorage(events: CalendarEvent[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(events));
  }
}
