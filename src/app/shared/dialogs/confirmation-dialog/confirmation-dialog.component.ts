import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: {data:any,title:string,description:string,message:string},private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.hide()
  }

  confirm(){
    this.spinnerService.show()
    this.dialogRef.close({
      status:true,
      data:this.data.data
    })
  }

}
