import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderContainerComponent } from './calender-container.component';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

describe('CalenderContainerComponent', () => {
  let component: CalenderContainerComponent;
  let fixture: ComponentFixture<CalenderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderContainerComponent ],
      imports:[
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
