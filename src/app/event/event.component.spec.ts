import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventComponent],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save without title shows error', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#save-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.error-container')?.textContent).toContain('Title is required.');
  });

  it('save without date shows error', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#save-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.error-container')?.textContent).toContain('Date is required.');
  });

  it('save without start time shows error', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#save-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.error-container')?.textContent).toContain('Start time is required.');
  });

  it('save without end time shows error', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (compiled.querySelector('#save-button') as HTMLElement)?.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.error-container')?.textContent).toContain('End time is required.');
  });


});
