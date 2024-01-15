import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private dateService: DateService) { }

  currentDate = this.dateService.getCurrentDate()

  ngOnInit(): void {
    this.currentDate.subscribe(x => console.log(x?.format('MMMM')))
  }

}
