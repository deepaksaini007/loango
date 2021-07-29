import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ButtonRendrerComponent } from 'src/app/shared/components/button-rendrer/button-rendrer/button-rendrer.component';
import { ImageRendrer } from 'src/app/shared/components/image-rendrer/image_rendrer';
import { MenuDropDownRendrer } from 'src/app/shared/components/menudropdown_rendrer/menu_dropdown_rendrer';
import { SwitchCellRendrer } from 'src/app/shared/components/switch_cell/switch_cell.view';

import { AddDashboardComponent } from 'src/app/shared/dialogs/add-dashboard/add-dashboard.component';
import { AddItemTypeComponent } from 'src/app/shared/dialogs/add-item-type/add-item-type.component';
import { Banner, DashboardData, ItemType } from '../../data-models/dashboard-data';

import { StoreService } from '../../services/store/store.service';
@Component({
  selector: 'app-itemtypelist',
  templateUrl: './itemtypelist.component.html',
  styleUrls: ['./itemtypelist.component.scss']
})
export class ItemtypelistComponent implements OnInit {
  constructor(private storeService: StoreService, private dialog: MatDialog) {}

  defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    wrapText: true,
    sortable: true,
    autoHeight: true,

  };
  columnDefs = [
    {
      field: 'item_icon',
      headerName: 'Item Icon',
      cellRenderer: 'imgRendrer',
      cellRendererParams: (params: any) => ({
        imageUrl: (params.data as ItemType).item_icon,
      }),
    },
    { field: 'item_cat', headerName: 'Item Category', },
    {field:'item_name_hn' , headerName: 'Item Name (Hindi)',},
    {field:'item_name_en' , headerName: 'Item Name ',},
    { field: 'Action',

    cellRenderer:'switchRendrer',
    cellRendererParams: (params:any)=>({
      isSwitchOn:(params.data as ItemType).is_active,
      clicked:(value:boolean)=>{
        this.storeService.updateItemType({...params.data,is_active:value},true)
      }
    })
   },
   {
    field: "actions",
    headerName: "Actions",
    cellRenderer: "dropdownMenuRendrer",
    filter: false,

    cellRendererParams: (params:any) => ({
      dataMap: [
        {
          name: "Edit",
          shouldShow: true,
          callback:()=>{
            this.storeService.updateItemType(params.data)
          },
        },
        {
          name: "Delete",
          shouldShow: true,
            callback:()=>{
              this.storeService.deleteItemType(params.data)
            },
        },

      ],
    }),
  },
  ];
  frameworkComponents = {
    imgRendrer: ImageRendrer,
    buttonRendrer:ButtonRendrerComponent,
    switchRendrer:SwitchCellRendrer,
    dropdownMenuRendrer:MenuDropDownRendrer
  };
  rowData: Observable<ItemType[] | undefined> | undefined;
  updateItemType(appItemTypeData:ItemType){
    this.storeService.updateItemType(appItemTypeData)
  }
  ngOnInit(): void {

    this.rowData = this.storeService.availableCategories;
    this.storeService.dispatchDashboardData();
  }
  closeDialog()
  {

  }
  openItemTypeDialog() {
    this.storeService.addItemType();

  }

}
