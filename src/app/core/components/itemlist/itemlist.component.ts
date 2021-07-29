import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddItemComponent } from 'src/app/shared/dialogs/add-item/add-item.component';
import { ItemType } from '../../data-models/dashboard-data';
import {
  AllMasterItemData,
  MasterItemListData,
} from '../../data-models/master-item-list/master-item-list.data';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss'],
})
export class ItemlistComponent implements OnInit {
  constructor(private dialog: MatDialog, private storeService: StoreService) {}
  allItemMasterData: MasterItemListData | undefined;
  activeCategoryView: string | undefined;
  allCategories$: Observable<ItemType[] | undefined> | undefined;
  rowData: AllMasterItemData[] | undefined;
  ngOnInit(): void {
    this.allCategories$ = this.storeService.availableCategories;
    this.storeService.dispatchMasterItemList();
    this.storeService.masterItemList$.subscribe((data) => {
      if (data) {
        this.allItemMasterData = data;
        if (!this.activeCategoryView) {
          this.activeCategoryView = Object.keys(this.allItemMasterData)[0];
        }
        this.rowData = this.allItemMasterData[this.activeCategoryView];
      }
    });
  }

  openItemDialog() {
    if(this.activeCategoryView){
      this.storeService.addItemList(this.activeCategoryView);
    }
  }
  updateItemList(itemData:AllMasterItemData){
    this.storeService.updateItemData(itemData)
  }

  deleteItems(itemData:AllMasterItemData)
  {

       this.storeService.deleteItems(itemData)
  }
  activateDeactivateItem(itemData:AllMasterItemData){
    this.storeService.updateItemData({...itemData,is_active:!itemData.is_active},true)
  }

  get categoryKeys() {
    if (this.allItemMasterData) {
      return Object.entries(this.allItemMasterData).map(([key, value]) => key);
    }
    return [];
  }

  changeCategoryView(itemName: string) {
    if (this.allItemMasterData) {
      this.activeCategoryView = itemName;
      this.rowData = this.allItemMasterData[this.activeCategoryView];
    }
  }

  getFormattedInsDate(date: Date | undefined) {
    if (date) {
      return new DatePipe('en-US').transform(date, 'MMM dd, yyyy');
    }
    return '';
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
