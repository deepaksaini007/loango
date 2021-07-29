import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { Banner } from 'src/app/core/data-models/dashboard-data';
import { ValidatorsService } from 'src/app/core/services/validators/validators.service';

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss'],
})
export class AddDashboardComponent implements OnInit {
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  base64Thumbnail: string | undefined;
  isUrl: boolean | undefined = false;

  public Editor = ClassicEditor;
  constructor(
    public validatorService:ValidatorsService,
    public dialog: MatDialogRef<AddDashboardComponent>,
    private spinnerService: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public dialogData:{bannerData:Banner}
  ) {}

  bannerFormGroup!: FormGroup;

  ngOnInit(): void {
    this.spinnerService.hide();
    this.bannerFormGroup = new FormGroup({
      type: new FormControl('banner', [Validators.required]),
      title_hn: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      title_en: new FormControl(null, [Validators.required,Validators.minLength(5)]),
      description_hn: new FormControl('Enter Description (In Hindi) ', [
        Validators.required,
      ]),
      description_en: new FormControl('Enter Description (In English)', [
        Validators.required,
      ]),
      is_active:new FormControl(true, [Validators.required]),
      url: new FormControl(null, [Validators.required]),
      status: new FormControl(true, [Validators.required]),
      banner_image: new FormControl(null, [Validators.required]),
    });

    if(this.dialogData){
      if(this.dialogData.bannerData){
        this.base64Thumbnail = this.dialogData.bannerData.banner_image;
        this.isUrl = this.dialogData.bannerData.banner_image?.includes('http');
        this.bannerFormGroup.patchValue({...this.dialogData.bannerData})
      }
    }
  }

  submitForm() {
    this.spinnerService.show();
    this.dialog.close({
      status: true,
      data: {
        ...this.dialogData?.bannerData,
        ...this.bannerFormGroup.value,
        banner_image: this.base64Thumbnail,
      },
    });
  }

  onThumbnailAdded(base64: string) {
    this.base64Thumbnail = base64;
    this.isUrl = false;
    this.bannerFormGroup.patchValue({ banner_image: this.base64Thumbnail });
  }

  closeDialog() {
    this.dialog.close(AddDashboardComponent);
  }
}
