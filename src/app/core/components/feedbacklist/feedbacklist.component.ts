import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.scss']
})
export class FeedbacklistComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  columnDefs =
  [
    { field: 'SrNo' },
    { field: 'Name' },
    { field: 'Email' },
    { field: 'Phone' },
    { field: 'Message'},
    { field: 'Status' },
    { field: 'RegisteredOn' },
  ];

rowData = [
  { SrNo: '1', Name: 'Garima', Phone:"89*******9",Email:"Garima@gmail.com",Message:"testing Message......",Status:"Active",RegisteredOn:"May, 08 2021"},
  { SrNo: '2', Name: 'Gurpreet', Phone:"98*******9",Email:"gurpreet@gmail.com",Message:"testing Message......",Status:"closed",RegisteredOn:"May, 04 2021"},

];
  ngOnInit(): void {
  }
  closeDialog()
  {

  }

}
