import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ADD_DASHBOARD_BANNER_ENDPOINT, UPDATE_ITEM_TYPE_ENDPOINT,ADD_ITEM_TYPE_ENDPOINT, DELETE_ITEM_DATA_ENDPOINT,GET_DASHBOARD_DATA_ENDPOINT, UPDATE_DASHBOARD_BANNER_ENDPOINT } from '../../constants';
import { BaseResponseModel } from '../../data-models/base_response.model';
import { Banner, DashboardData, ItemType } from '../../data-models/dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  getDashboardDetails(): Observable<DashboardData> {
    return this.httpClient
      .get<BaseResponseModel>(GET_DASHBOARD_DATA_ENDPOINT)
      .pipe(map((data) => data.responseData?.data as DashboardData));
  }

  addAppBanner(bannerData:Banner):Observable<Banner>{
    return this.httpClient.post<BaseResponseModel>(ADD_DASHBOARD_BANNER_ENDPOINT,bannerData).pipe(
      map((data)=>data.responseData?.data as Banner)
    )
  }
  updateAppBanner(
    appBannerData: Banner
  ): Observable<Banner> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_DASHBOARD_BANNER_ENDPOINT, appBannerData)
      .pipe(map((data) => data.responseData?.data as Banner));
  }

  addItemType(itemData:ItemType):Observable<ItemType>{
    return this.httpClient.post<BaseResponseModel>(ADD_ITEM_TYPE_ENDPOINT,itemData).pipe(
      map((data)=>data.responseData?.data as ItemType)
    )
  }
  deleteItemType(itemData: ItemType):Observable<ItemType>{
    return this.httpClient.post<BaseResponseModel>(DELETE_ITEM_DATA_ENDPOINT,itemData).pipe(
      map((data)=>data.responseData?.data as ItemType)
    )
  }

  updateItemType(
    itemData: ItemType
  ): Observable<ItemType> {
    return this.httpClient
      .post<BaseResponseModel>(UPDATE_ITEM_TYPE_ENDPOINT, itemData)
      .pipe(map((data) => data.responseData?.data as ItemType));
  }
}
