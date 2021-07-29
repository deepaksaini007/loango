import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAuthorization from './authorization';
import * as fromMasterItem from './master-item-list';
import * as fromMasterApp from './master-app-data';
import * as fromAdmin from './admin'
export interface State {
  userAuthorizationState: fromAuthorization.UserProfileState;
  masterItemListState: fromMasterItem.MasterItemListState;
  masterAppState: fromMasterApp.MasterAppDataState;
  adminState:fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<State, any> = {
  userAuthorizationState: fromAuthorization.authReducer,
  masterItemListState: fromMasterItem.masterItemReducer,
  masterAppState: fromMasterApp.masterAppReducer,
  adminState:fromAdmin.adminReducer,
};
export const selectAdminState = (state:State)=>state.adminState;
export const getAllUsersForAdmin = createSelector(selectAdminState,fromAdmin.selectAllUsers)

export const selectUserAuthState = (state: State) =>
  state.userAuthorizationState;
export const selectMasterItemState = (state: State) =>
  state.masterItemListState;
export const selectMasterAppState = (state: State) => state.masterAppState;

export const getLoggedInUser = createSelector(
  selectUserAuthState,
  fromAuthorization.selectUser
);
export const getDashboardData = createSelector(
  selectUserAuthState,
  fromAuthorization.selectDashboardData
);
export const getMasterItemListData = createSelector(
  selectMasterItemState,
  fromMasterItem.selectMasterItemData
);
export const getMasterAppData = createSelector(
  selectMasterAppState,
  fromMasterApp.selectMasterAppData
);
export const getAvailableCategories = createSelector(
  selectUserAuthState,
  fromAuthorization.selectAllCategoris
);
export const getDashboardMenuWithUserDetails = createSelector(
  selectUserAuthState,
  fromAuthorization.selectMenuAndProfile
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
