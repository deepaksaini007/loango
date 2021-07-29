import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-rows',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {
  @Input() noRowsMessage:string|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
