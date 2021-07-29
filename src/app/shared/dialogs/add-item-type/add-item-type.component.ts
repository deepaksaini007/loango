import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemType } from 'src/app/core/data-models/dashboard-data';
import { AllMasterItemData } from 'src/app/core/data-models/master-item-list/master-item-list.data';
import { ValidatorsService } from 'src/app/core/services/validators/validators.service';

@Component({
  selector: 'app-add-item-type',
  templateUrl: './add-item-type.component.html',
  styleUrls: ['./add-item-type.component.scss'],
})
export class AddItemTypeComponent implements OnInit {
  base64Thumbnail: string | undefined;
  isUrl: boolean | undefined = false;
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  itemTypeFormGroup!: FormGroup;
  public Editor = ClassicEditor;
  constructor(public dialog: MatDialogRef<AddItemTypeComponent>,  public validatorService:ValidatorsService,
    @Inject(MAT_DIALOG_DATA) public dialogData:{itemData:ItemType},private spinnerService:NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.hide();
    this.itemTypeFormGroup = new FormGroup({
      item_cat: new FormControl(null, [Validators.required]),
      item_name_hn: new FormControl(null, [Validators.required]),
      item_name_en: new FormControl(null, [Validators.required]),
      item_icon: new FormControl(null, [Validators.required]),
    });

    if(this.dialogData){
      if(this.dialogData.itemData){
        this.base64Thumbnail = this.dialogData.itemData.item_icon;
        this.isUrl = this.dialogData.itemData.item_icon?.includes('http');
        this.itemTypeFormGroup.patchValue({...this.dialogData.itemData})
      }
    }

  }
  closeDialog() {
    this.dialog.close();
  }

  onThumbnailAdded(event: string) {
    this.base64Thumbnail = event;
    this.isUrl = false;
    this.itemTypeFormGroup.patchValue({item_icon:this.base64Thumbnail})
  }

  submit(){
    this.spinnerService.show();
    this.dialog.close({

      status:true,
      data:{
        ...this.dialogData?.itemData,
        ...this.itemTypeFormGroup.value,
        item_icon:this.base64Thumbnail
      }
    })
  }

}
