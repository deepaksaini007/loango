import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VALIDATE_RESET_PASSWORD,DO_NOT_ADD_TOKEN } from 'src/app/core/constants';
import { UserData } from 'src/app/core/data-models/auth-response';
import { BaseResponseModel } from 'src/app/core/data-models/base_response.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserService {

  constructor(private httpClient: HttpClient) { }
  validateUserForReset(
    validateUserRequest: UserData
  ): Observable<UserData> {
    return this.httpClient
      .post<BaseResponseModel>(VALIDATE_RESET_PASSWORD, validateUserRequest, {
        headers: {
          [DO_NOT_ADD_TOKEN]: "true",
        },
      })
      .pipe(
        map((data) => {
          return data.responseData?.data as UserData;
        })
      );
  }
  // resetPassword(resetPassword:User):Observable<User>{
  //   return this.httpClient.post<BaseResponseModel>(RESET_PASSWORD_UDPATE,resetPassword,{
  //     headers: {
  //       [DO_NOT_ADD_TOKEN]: "true",
  //     },
  //   }).pipe(map(data=>data.responseData.data as User))
  // }
}
