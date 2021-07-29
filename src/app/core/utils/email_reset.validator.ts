import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Store } from "@ngrx/store";
import {Observable, of } from "rxjs";
import { catchError, map } from "rxjs/internal/operators";
import { ValidateUserService } from "../services/Authorization/validateUser/validate-user.service";

@Injectable({
  providedIn: "root",
})
export class UserEmailForResetValidator {
  constructor(private validatorService:ValidateUserService) {}
  userEmailValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.validatorService.validateUserForReset({
        user_login_elm: control.value
      }).pipe(map((data)=>{
        return null;
      }),catchError((err)=>{
        return of({
          "alreadyRegistered":true
        });
      }))
    };
  }
}

