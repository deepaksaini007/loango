import { Action } from '@ngrx/store';
import { UserData } from 'src/app/core/data-models/auth-response';
import { Banner, DashboardData, ItemType } from 'src/app/core/data-models/dashboard-data';
import { DashboardMenu } from 'src/app/core/data-models/dashboard-menu/dashbord-menu';
import { LoadingAction, LoadingActionTypes } from 'src/app/modules/loading';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER FAIL';

export class LogiUserAction implements Action {
  readonly type = LOGIN_USER;
  constructor(
    public authData: { userId: string; password: string; authCode: string },
    public shouldRedirect: boolean = true
  ) {}
}

export class LogiUserActionSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: {userData: UserData; allMenus: DashboardMenu[] }, public shouldRedirect: boolean) {}
}

export class LogiUserActionFail implements Action {
  readonly type = LOGIN_USER_FAIL;
  constructor(public payload: string) {}
}
export const GET_DASHBOARD_CARDS_DATA = 'GET_DASHBOARD_CARDS_DATA';
export const GET_DASHBOARD_CARDS_DATA_SUCCESS =
  'GET_DASHBOARD_CARDS_DATA SUCCESS';
export const GET_DASHBOARD_CARDS_DATA_FAIL = 'GET_DASHBOARD_CARDS_DATA FAIL';

export class GetDashboardCardsData implements Action {
  readonly type = GET_DASHBOARD_CARDS_DATA;
  constructor() {}
}

export class GetDashboardCardsDataSuccess implements Action {
  readonly type = GET_DASHBOARD_CARDS_DATA_SUCCESS;
  constructor(public payload: DashboardData) {}
}

export class GetDashboardCardsDataFail implements Action {
  readonly type = GET_DASHBOARD_CARDS_DATA_FAIL;
  constructor(public payload: any) {}
}


export const CREATE_ITEM_TYPE = "CREATE_ITEM_TYPE"
export const CREATE_ITEM_TYPE_SUCCESS = "CREATE_ITEM_TYPE SUCCESS"
export const CREATE_ITEM_TYPE_FAIL = "CREATE_ITEM_TYPE FAIL"

export class CreateItemTypeEvent implements Action,LoadingAction {
    paisaRupeeLoading = {add:CREATE_ITEM_TYPE}
    readonly type = CREATE_ITEM_TYPE;
    constructor() { }
}

export class CreateItemTypeEventSuccess implements Action,LoadingAction {
    paisaRupeeLoading = {remove:CREATE_ITEM_TYPE}

    readonly type = CREATE_ITEM_TYPE_SUCCESS;
    constructor(public payload: ItemType) { }
}

export class CreateItemTypeEventFail implements Action,LoadingAction {
    paisaRupeeLoading = {remove:CREATE_ITEM_TYPE}

    readonly type = CREATE_ITEM_TYPE_FAIL;
    constructor(public payload: any) { }
}


export const CREATE_BANNER_EVENT = "CREATE_BANNER_EVENT"
export const CREATE_BANNER_EVENT_SUCCESS = "CREATE_BANNER_EVENT SUCCESS"
export const CREATE_BANNER_EVENT_FAIL = "CREATE_BANNER_EVENT FAIL"

export class CreateDashboardBanner implements Action,LoadingAction {
    paisaRupeeLoading  = { add: CREATE_BANNER_EVENT}
    readonly type = CREATE_BANNER_EVENT;
    constructor() { }
}

export class CreateDashboardBannerSuccess implements Action,LoadingAction {
    paisaRupeeLoading  = { remove: CREATE_BANNER_EVENT}

    readonly type = CREATE_BANNER_EVENT_SUCCESS;
    constructor(public payload: Banner) { }
}

export class CreateDashboardBannerFail implements Action,LoadingAction {
    paisaRupeeLoading  = { remove: CREATE_BANNER_EVENT}

    readonly type = CREATE_BANNER_EVENT_FAIL;
    constructor(public payload: any) { }
}


export const UPDATE_ITEM_TYPE = "UPDATE_ITEM_TYPE"
export const UPDATE_ITEM_TYPE_SUCCESS = "UPDATE_ITEM_TYPE SUCCESS"
export const UPDATE_ITEM_TYPE_FAIL = "UPDATE_ITEM_TYPE FAIL"

export class UpdateItemTypeEvent implements Action,LoadingAction {
    paisaRupeeLoading = {add:UPDATE_ITEM_TYPE}
    readonly type = UPDATE_ITEM_TYPE;
    constructor(public payload: ItemType,public isActionRequest:boolean) { }
}

export class UpdateItemTypeEventSuccess implements Action,LoadingAction {
    paisaRupeeLoading = {remove:UPDATE_ITEM_TYPE}

    readonly type = UPDATE_ITEM_TYPE_SUCCESS;
    constructor(public payload: ItemType) { }
}

export class UpdateItemTypeEventFail implements Action,LoadingAction {
    paisaRupeeLoading = {remove:UPDATE_ITEM_TYPE}

    readonly type = UPDATE_ITEM_TYPE_FAIL;
    constructor(public payload: any) { }
}





export const DELETE_ITEM_TYPE = "DELETE_ITEM_TYPE"
export const DELETE_ITEM_TYPE_SUCCESS = "DELETE_ITEM_TYPE SUCCESS"
export const DELETE_ITEM_TYPE_FAIL = "DELETE_ITEM_TYPE FAIL"

export class DeleteItemTypeEvent implements Action,LoadingAction {
    paisaRupeeLoading = {add:DELETE_ITEM_TYPE}
    readonly type = DELETE_ITEM_TYPE;
    constructor(public payload: ItemType,public isActionRequest:boolean) { }
}

export class DeleteItemTypeEventSuccess implements Action,LoadingAction {
    paisaRupeeLoading = {remove:DELETE_ITEM_TYPE}

    readonly type = DELETE_ITEM_TYPE_SUCCESS;
    constructor(public payload: ItemType) { }
}

export class DeleteItemTypeEventFail implements Action,LoadingAction {
    paisaRupeeLoading = {remove:DELETE_ITEM_TYPE}

    readonly type = DELETE_ITEM_TYPE_FAIL;
    constructor(public payload: any) { }
}

export const UPDATE_BANNER_EVENT = "UPDATE_BANNER_EVENT"
export const UPDATE_BANNER_EVENT_SUCCESS = "UPDATE_BANNER_EVENT SUCCESS"
export const UPDATE_BANNER_EVENT_FAIL = "UPDATE_BANNER_EVENT FAIL"

export class UpdateDashboardBanner implements Action,LoadingAction {
    paisaRupeeLoading  = { add: UPDATE_BANNER_EVENT}
    readonly type = UPDATE_BANNER_EVENT;
    constructor(public payload: Banner) { }
}

export class UpdateDashboardBannerSuccess implements Action,LoadingAction {
    paisaRupeeLoading  = { remove: UPDATE_BANNER_EVENT}

    readonly type = UPDATE_BANNER_EVENT_SUCCESS;
    constructor(public payload: Banner) { }
}

export class UpdateDashboardBannerFail implements Action,LoadingAction {
    paisaRupeeLoading  = { remove: UPDATE_BANNER_EVENT}

    readonly type = UPDATE_BANNER_EVENT_FAIL;
    constructor(public payload: any) { }
}


export const GET_ALL_DASHBOARD_MENU = 'GET_ALL_DASHBOARD_MENU';
export const GET_ALL_DASHBOARD_MENU_SUCCESS = 'GET_ALL_DASHBOARD_MENU SUCCESS';
export const GET_ALL_DASHBOARD_MENU_FAIL = 'GET_ALL_DASHBOARD_MENU FAIL';

export class GetAllDashboardMenu implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU;
  constructor() {}
}

export class GetAllDashboardMenuSuccess implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU_SUCCESS;
  constructor(public payload: DashboardMenu[]) {}
}

export class GetAllDashboardMenuFail implements Action {
  readonly type = GET_ALL_DASHBOARD_MENU_FAIL;
  constructor(public payload: any) {}
}


export type UserActions =
  | LogiUserAction
  | LogiUserActionSuccess
  | LogiUserActionFail
  | GetDashboardCardsData
  | GetDashboardCardsDataSuccess
  | GetDashboardCardsDataFail
  |UpdateDashboardBannerFail
  |UpdateDashboardBannerSuccess
  |UpdateDashboardBanner
  |UpdateItemTypeEvent
  |UpdateItemTypeEventFail
  |UpdateItemTypeEventSuccess
  | GetAllDashboardMenu
  | GetAllDashboardMenuSuccess
  | GetAllDashboardMenuFail
  ;
