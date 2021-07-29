import { UserData } from 'src/app/core/data-models/auth-response';
import { DashboardData } from 'src/app/core/data-models/dashboard-data';
import { DashboardMenu } from 'src/app/core/data-models/dashboard-menu/dashbord-menu';
import {
  LOGIN_USER,
  UserActions,
  GET_DASHBOARD_CARDS_DATA_SUCCESS,
  LOGIN_USER_SUCCESS,
  GET_ALL_DASHBOARD_MENU_SUCCESS,
} from '../../actions/authorization/login';

export interface UserProfileState {
  user: UserData | undefined;
  loggedIn: boolean;
  errorMessage: string;
  hasError: boolean;
  dashboardData?: DashboardData;
  allDashboardMenus:  DashboardMenu[];
}
const initialState: UserProfileState = {
  user: undefined,
  loggedIn: false,
  hasError: false,
  errorMessage: '',
  dashboardData: undefined,
  allDashboardMenus: [],
};

export function authReducer(
  state = initialState,
  action: UserActions
): UserProfileState {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, user: {...action.payload.userData},allDashboardMenus:[...action.payload.allMenus] };
    case GET_DASHBOARD_CARDS_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: action.payload,
      };
      case GET_ALL_DASHBOARD_MENU_SUCCESS:
        return {
          ...state,
          allDashboardMenus: action.payload,
        };
    default:
      return state;
  }
}

export const selectUser = (state: UserProfileState) => state.user;
export const selectDashboardData = (state: UserProfileState) =>
  state.dashboardData;
export const selectAllCategoris = (state:UserProfileState)=>state.dashboardData?.item_type;
export const selectMenuAndProfile = (state: UserProfileState) => ({
  availableMenus: [...state.allDashboardMenus],
  userProfile: { ...state.user },
});
