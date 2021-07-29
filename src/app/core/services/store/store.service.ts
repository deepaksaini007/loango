import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getLoadingData } from 'src/app/modules/loading';
import { environment } from 'src/environments/environment';
import * as fromStore from '../../../store';
import { UserData } from '../../data-models/auth-response';
import { Banner, ItemType } from '../../data-models/dashboard-data';
import { AllMasterAppData } from '../../data-models/master-app-data';
import { AllMasterItemData } from '../../data-models/master-item-list/master-item-list.data';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store<fromStore.State>) {}
  getAllRegisteredUsers$ = this.store.select(fromStore.getAllUsersForAdmin)
  getLoggedInUser$ = this.store.select(fromStore.getLoggedInUser);
  getDashbaordData$ = this.store.select(fromStore.getDashboardData);
  masterAppData$ = this.store.select(fromStore.getMasterAppData);
  masterItemList$ = this.store.select(fromStore.getMasterItemListData);

  availableCategories = this.store.select(fromStore.getAvailableCategories)
  isLoading$ = this.store
    .pipe(select(getLoadingData))
    .pipe(map((data) => data && data.length > 0));
  isAdmin$ = this.store
    .select(fromStore.getLoggedInUser)
    .pipe(map((data) => data?.user_role === environment.adminRoleName));
  authenticateUser(
    userId: string,
    password: string,
    authCode: string,
    shouldRedirect: boolean = true
  ) {
    this.store.dispatch(
      new fromStore.LogiUserAction(
        { userId, password, authCode },
        shouldRedirect
      )
    );
  }
  assignedMenus$ = this.store
    .select(fromStore.getDashboardMenuWithUserDetails)
    .pipe(
      map((data) => {
        if (data) {
          if (data.userProfile.user_role === environment.adminRoleName) {
            return [...data.availableMenus];
          } else {
            if (data.userProfile.assigned_menu) {
              const menuIds = data.userProfile.assigned_menu
                .split(',')
                .map((a) => +a);
              const assignedMenus = data.availableMenus.filter(
                (menu) => menu && menu.menu_id && menuIds.includes(menu.menu_id)
              );
              return [...assignedMenus]
            }
            return [];
          }
        }
        return [];
      })
    );

  dispatchDashboardData(){
    this.store.dispatch(new fromStore.GetDashboardCardsData())
  }
  dispatchMasterAppData(){
    this.store.dispatch(new fromStore.LoadMasterAppData());
  }
  dispatchMasterItemList(){
    this.store.dispatch(new fromStore.LoadMasterItemData());
  }

  addBanner(){
    this.store.dispatch(new fromStore.CreateDashboardBanner())
  }
  updateBanner(bannerData:Banner){
    this.store.dispatch(new fromStore.UpdateDashboardBanner(bannerData))
  }
  addItemType(){
    this.store.dispatch(new fromStore.CreateItemTypeEvent())

  }
  deleteItemType(itemData:ItemType,isActionRequest:boolean = false,){
    this.store.dispatch(new fromStore.DeleteItemTypeEvent(itemData,isActionRequest))

  }
  updateItemType(itemData:ItemType,isActionRequest:boolean = false,){
    this.store.dispatch(new fromStore.UpdateItemTypeEvent(itemData,isActionRequest))

  }
  addAppData(){
      this.store.dispatch(new fromStore.CreateMasterAppData())

  }
  updateAppData(appData:AllMasterAppData){
    this.store.dispatch(new fromStore.UpdateMasterAppData(appData))

  }

  addItemList(categoryName: string){
    this.store.dispatch(new fromStore.CreateMasterItemData(categoryName))
  }
  deleteItems(itemData:AllMasterItemData){
    this.store.dispatch(new fromStore.DeleteMasterItemData(itemData))
  }
  updateItemData(itemData:AllMasterItemData,isActiveStatus:boolean = false){
    this.store.dispatch(new fromStore.UpdateMasterItemData(itemData,isActiveStatus))
  }

  loadAllRegisteredUsers(){
    this.store.dispatch(new fromStore.LoadWebAppUsersEvent())
  }

  registerNewUser(){
    this.store.dispatch(new fromStore.CreateWebAppUsersEvent())
  }
  updateUserProfile(userData:UserData,isActionUpdate:boolean = false){
    this.store.dispatch(new fromStore.UpdateWebAppUsersEvent(userData,isActionUpdate))
  }
  deleteUserProfile(userData:UserData){
    this.store.dispatch(new fromStore.DeleteWebAppUsersEvent(userData))
  }
}
