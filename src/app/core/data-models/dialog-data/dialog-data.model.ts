import { Banner, ItemType } from "../dashboard-data";
import { AllMasterAppData } from "../master-app-data";
import { AllMasterItemData } from "../master-item-list/master-item-list.data";


export interface DialogData{
    status:boolean;
    data:AllMasterItemData|AllMasterAppData|Banner|ItemType
}