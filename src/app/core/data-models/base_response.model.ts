import { DashboardData } from "./dashboard-data";
import { MasterAppData } from "./master-app-data";
import { MasterItemListData } from "./master-item-list/master-item-list.data";

export interface BaseResponseModel {
    doLogOut?:     boolean;
    languageCode?: string;
    responseData?: ResponseData;
    responseMsg?:  ResponseMsg;
}

export interface ResponseData {
    data?:             DashboardData|MasterItemListData|MasterAppData;
    isObject?:         boolean;
    isCollection?:     boolean;
    responseDataType?: string;
}




export interface ResponseMsg {
    isError?:           boolean;
    errorMessage?:      string;
    isWarning?:         boolean;
    warningMessage?:    string;
    isEmptyCollection?: boolean;
    successMessage?:    null;
    exceptionModel?:    null;
}
