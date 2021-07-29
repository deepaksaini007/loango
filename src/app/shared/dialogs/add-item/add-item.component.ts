import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
// @ts-ignore

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemType } from 'src/app/core/data-models/dashboard-data';
import { AllMasterItemData } from 'src/app/core/data-models/master-item-list/master-item-list.data';
import { StoreService } from 'src/app/core/services/store/store.service';
import { ValidatorsService } from 'src/app/core/services/validators/validators.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  ckEditorConfig: CKEditor5.Config = {
    language: 'hi',
  };
  base64Thumbnail: string | undefined;
  public Editor = ClassicEditor;
  isInsuranceSelected: boolean = false;

  constructor(
    public validatorService:ValidatorsService,
    private storeService: StoreService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { itemData: AllMasterItemData; categoryName: string }
  ) {}

  itemFormGroup!: FormGroup;
  allCategories$: Observable<ItemType[] | undefined> | undefined;
  isUrl: boolean | undefined;

  ngOnInit(): void {
    this.allCategories$ = this.storeService.availableCategories;
    this.storeService.dispatchDashboardData();
    this.spinnerService.hide();
    this.itemFormGroup = new FormGroup({
      item_id: new FormControl(null, [Validators.required]),
      category_details: new FormControl(null, [Validators.required]),
      item_type: new FormControl(null, [Validators.required]),
      item_icon: new FormControl(null, [Validators.required]),
      item_title_hn: new FormControl(null, [Validators.required]),
      item_title_en: new FormControl(null, [Validators.required]),
      description_hn: new FormControl('Enter Description (In Hindi)', [
        Validators.required,
      ]),
      description_en: new FormControl('Enter Description (In English)', [
        Validators.required,
      ]),
      max_amount: new FormControl(null, [Validators.required]),
      max_range: new FormControl(null, [Validators.required]),
      interest_rate: new FormControl(null, [Validators.required]),
      monthly_interest: new FormControl(null, [Validators.required]),
      processing_fees: new FormControl(null, [Validators.required]),
      tenure: new FormControl(null, [Validators.required]),
      redirect_url: new FormControl(null, [Validators.required]),
      is_redirect: new FormControl(false, [Validators.required]),
      company_name: new FormControl(null, [Validators.required]),
      deal_type: new FormControl(null, []),
      is_trusted: new FormControl(false, [Validators.required]),
    });

    this.allCategories$ = of([]);

    this.listenForCategoryChange();

    this.onItemTypeChanged();
    if (this.dialogData) {
      if (this.dialogData.itemData) {
        this.base64Thumbnail = this.dialogData.itemData.item_icon;
        this.isUrl = this.dialogData.itemData.item_icon?.includes('http');
      }
      this.itemFormGroup.patchValue({
        ...this.dialogData.itemData,
        item_type: this.categoryValue,
      });

      this.isInsuranceSelected =
        this.dialogData.itemData.item_type === 'Insurance';
      if (this.dialogData.itemData && !this.dialogData.categoryName) {
        this.itemFormGroup.patchValue({
          category_details: {
            item_id: this.dialogData.itemData.item_id,
          },
        });
      }
    }
  }

  get categoryValue() {
    if (this.dialogData.categoryName) {
      switch (this.dialogData.categoryName.toLowerCase()) {
        case 'loans':
          return 'Loan';
        case 'credit_card':
          return 'Credit Card';
        case 'insurance':
          return 'Insurance';
        default:
          return '';
      }
    }
    return this.dialogData?.itemData?.item_type;
  }

  onItemTypeChanged() {
    this.itemFormGroup.get('item_type')?.valueChanges.subscribe((val) => {
      if (val) {
        if (val === 'Insurance') {
          this.isInsuranceSelected = true;
        } else {
          this.isInsuranceSelected = false;
        }
        this.allCategories$ = this.storeService.availableCategories.pipe(
          map((data) => data?.filter((e) => e.item_cat === val))
        );
      }
    });
  }
  closeDialog() {
    this.dialog.close();
  }

  onThumbnailAdded(base64: string) {
    this.base64Thumbnail = base64;
    this.isUrl = false;
    this.itemFormGroup.patchValue({ item_icon: this.base64Thumbnail });
  }

  submitData() {
    this.spinnerService.show();
    delete this.itemFormGroup.value['category_details'];
    this.dialog.close({
      status: true,
      data: {
        ...this.dialogData?.itemData,
        ...this.itemFormGroup.value,
      },
    });
  }

  listenForCategoryChange() {
    this.itemFormGroup
      .get('category_details')
      ?.valueChanges.subscribe((val) => {
        if (val) {
          const categorySelected = val as ItemType;
          this.itemFormGroup.patchValue({
            item_id: categorySelected.item_id,
          });
          if (!categorySelected.item_name_en) {
            this.allCategories$?.subscribe((val) => {
              if (val) {
                const categ = val.find(
                  (a) => a.item_id === categorySelected.item_id
                );
                if (categ) {
                  this.itemFormGroup.patchValue({
                    item_id: categ.item_id,
                  });
                }
              }
            });
          }
        }
      });
  }

  objectComparisonFunction = function (
    option: ItemType,
    value: ItemType
  ): boolean {
    if (option && value) {
      if (option.item_name_en && value.item_name_en) {
        return option.item_name_en === value.item_name_en;
      }
      if (option.item_id && value.item_id) {
        return option.item_id === value.item_id;
      }
    }
    return false;
  };
}
