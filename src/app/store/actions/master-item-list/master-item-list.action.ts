import { Action } from '@ngrx/store';
import { AllMasterItemData, MasterItemListData } from 'src/app/core/data-models/master-item-list/master-item-list.data';
import { LoadingAction } from 'src/app/modules/loading';

export const MASTER_ITEM_LIST_EVENT = "MASTER_ITEM_LIST_EVENT"
export const MASTER_ITEM_LIST_EVENT_SUCCESS = "MASTER_ITEM_LIST_EVENT SUCCESS"
export const MASTER_ITEM_LIST_EVENT_FAIL = "MASTER_ITEM_LIST_EVENT FAIL"

export class LoadMasterItemData implements Action {
    readonly type = MASTER_ITEM_LIST_EVENT;
}

export class LoadMasterItemDataSuccess implements Action {
    readonly type = MASTER_ITEM_LIST_EVENT_SUCCESS;
    constructor(public payload: MasterItemListData) { }
}

export class LoadMasterItemDataFail implements Action {
    readonly type = MASTER_ITEM_LIST_EVENT_FAIL;
    constructor(public payload: any) { }
}

export const CREATE_MASTER_ITEM_LIST_EVENT = "CREATE MASTER_ITEM_LIST_EVENT"
export const CREATE_MASTER_ITEM_LIST_EVENT_SUCCESS = "CREATE MASTER_ITEM_LIST_EVENT SUCCESS"
export const CREATE_MASTER_ITEM_LIST_EVENT_FAIL = "CREATE MASTER_ITEM_LIST_EVENT FAIL"

export class CreateMasterItemData implements Action,LoadingAction {
    paisaRupeeLoading = {add:CREATE_MASTER_ITEM_LIST_EVENT}
    readonly type = CREATE_MASTER_ITEM_LIST_EVENT;
    constructor(public categoryName:string) { }
}

export class CreateMasterItemDataSuccess implements Action ,LoadingAction{
    readonly type = CREATE_MASTER_ITEM_LIST_EVENT_SUCCESS;
    paisaRupeeLoading = {remove:CREATE_MASTER_ITEM_LIST_EVENT}

    constructor(public payload: AllMasterItemData) { }
}

export class CreateMasterItemDataFail implements Action ,LoadingAction{
    readonly type = CREATE_MASTER_ITEM_LIST_EVENT_FAIL;
    paisaRupeeLoading = {remove:CREATE_MASTER_ITEM_LIST_EVENT}

    constructor(public payload: any) { }
}

export const UPDATE_MASTER_ITEM_LIST_EVENT = "UPDATE MASTER_ITEM_LIST_EVENT"
export const UPDATE_MASTER_ITEM_LIST_EVENT_SUCCESS = "UPDATE MASTER_ITEM_LIST_EVENT SUCCESS"
export const UPDATE_MASTER_ITEM_LIST_EVENT_FAIL = "UPDATE MASTER_ITEM_LIST_EVENT FAIL"

export class UpdateMasterItemData implements Action,LoadingAction {
    readonly type = UPDATE_MASTER_ITEM_LIST_EVENT;
    paisaRupeeLoading = {add:UPDATE_MASTER_ITEM_LIST_EVENT}

    constructor(public payload: AllMasterItemData,public isActiveStatusChanged:boolean) { }
}

export class UpdateMasterItemDataSuccess implements Action,LoadingAction {
    readonly type = UPDATE_MASTER_ITEM_LIST_EVENT_SUCCESS;
    paisaRupeeLoading = {remove:UPDATE_MASTER_ITEM_LIST_EVENT}

    constructor(public payload: AllMasterItemData) { }
}

export class UpdateMasterItemDataFail implements Action ,LoadingAction{
    readonly type = UPDATE_MASTER_ITEM_LIST_EVENT_FAIL;
    paisaRupeeLoading = {remove:UPDATE_MASTER_ITEM_LIST_EVENT}

    constructor(public payload: any) { }
}

export const DELETE_MASTER_ITEM_LIST_EVENT = "DELETE MASTER_ITEM_LIST_EVENT"
export const DELETE_MASTER_ITEM_LIST_EVENT_SUCCESS = "DELETE MASTER_ITEM_LIST_EVENT SUCCESS"
export const DELETE_MASTER_ITEM_LIST_EVENT_FAIL = "DELETE MASTER_ITEM_LIST_EVENT FAIL"

export class DeleteMasterItemData implements Action,LoadingAction {
    paisaRupeeLoading = {add:DELETE_MASTER_ITEM_LIST_EVENT}
    readonly type = DELETE_MASTER_ITEM_LIST_EVENT;
    constructor(public payload: AllMasterItemData) { }
}

export class DeleteMasterItemDataSuccess implements Action,LoadingAction {
        paisaRupeeLoading = {remove:DELETE_MASTER_ITEM_LIST_EVENT}

    readonly type = DELETE_MASTER_ITEM_LIST_EVENT_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteMasterItemDataFail implements Action,LoadingAction {
    paisaRupeeLoading = {remove:DELETE_MASTER_ITEM_LIST_EVENT}

    readonly type = DELETE_MASTER_ITEM_LIST_EVENT_FAIL;
    constructor(public payload: any) { }
}

export type MasterListActions =
    | LoadMasterItemData
    | LoadMasterItemDataSuccess
    | LoadMasterItemDataFail
    | CreateMasterItemData
    | CreateMasterItemDataSuccess
    | CreateMasterItemDataFail
    | UpdateMasterItemData
    | UpdateMasterItemDataSuccess
    | UpdateMasterItemDataFail
    | DeleteMasterItemData
    | DeleteMasterItemDataSuccess
    | DeleteMasterItemDataFail;
