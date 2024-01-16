import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public dateService: DateService) { }

  currentMonth = this.dateService.getCurrentMonth()

  ngOnInit(): void {
  }

}
