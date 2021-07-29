import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ADD_MASTER_ITEM_DATA_ENDPOINT, DELETE_MASTER_ITEM_DATA_ENDPOINT, GET_MASTER_DATA_ITEM_ENDPOINT, UPDATE_MASTER_ITEM_DATA_ENDPOINT } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { AllMasterItemData, MasterItemListData } from '../../data-models/master-item-list/master-item-list.data';

@Injectable({
  providedIn: 'root',
})
export class MasterItemService {
  constructor(private httpClient: HttpClient) {}

  getMasterItemData(): Observable<MasterItemListData> {
    return this.httpClient
      .get<BaseResponseModel>(GET_MASTER_DATA_ITEM_ENDPOINT)
      .pipe(map((data) => data.responseData?.data as MasterItemListData));
  }

  createNewMasterItemData(
    appMasterData: AllMasterItemData
  ): Observable<AllMasterItemData> {
    return this.httpClient
      .post<BaseResponseModel>(ADD_MASTER_ITEM_DATA_ENDPOINT, appMasterData)
      .pipe(map((data) => data.responseData?.data as AllMasterItemData));
  }

  updateMasterItemDataRecord(
    appMasterData: AllMasterItemData
  ): Observable<AllMasterItemData> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_MASTER_ITEM_DATA_ENDPOINT, appMasterData)
      .pipe(map((data) => data.responseData?.data as AllMasterItemData));
  }

  deleteMasterItemDataRecord(appMasterData: AllMasterItemData):Observable<AllMasterItemData>{
    return this.httpClient.post<BaseResponseModel>(DELETE_MASTER_ITEM_DATA_ENDPOINT,appMasterData).pipe(
      map((data)=>data.responseData?.data as AllMasterItemData)
    )
  }
}
