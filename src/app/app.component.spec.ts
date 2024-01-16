import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import MockDate from 'mockdate';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderContainerComponent } from './calender-container/calender-container.component';

describe('AppComponent', () => {
  beforeAll( () => {
    dayjs.extend(utc);
    MockDate.set('2024-01-15');
  });

  afterAll(() => MockDate.reset());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
      ],
      declarations: [
        AppComponent,
        ToolbarComponent,
        CalenderContainerComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render current month when loaded', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.current-month')?.textContent).toContain('January, 2024');
  });

  it('should render next month when next button clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#next-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.current-month')?.textContent).toContain('February, 2024');
  });

  it('should render next month when next button clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#previous-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.current-month')?.textContent).toContain('December, 2023');
  });

  it('should render current month calendar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cal-month-view')).toBeDefined();
  });
});
