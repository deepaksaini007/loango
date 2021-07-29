import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { Banner, ItemType } from 'src/app/core/data-models/dashboard-data';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog-data.model';
import { AuthenticationService } from 'src/app/core/services/Authentication/authentication-service.service';
import { AuthorizationService } from 'src/app/core/services/Authorization/authorization-service.service';
import { AddDashboardComponent } from 'src/app/shared/dialogs/add-dashboard/add-dashboard.component';
import { AddItemTypeComponent } from 'src/app/shared/dialogs/add-item-type/add-item-type.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
// import { EMPTY } from 'rxjs';
// import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  USER_AUTH_CODE,
  USER_EMAIL_ELEMENT,
  USER_PASSWORD_ELEMENT,
} from 'src/app/core/constants';
import * as fromAuthActions from '../../actions/authorization';
//import all requried services or any dependencies

@Injectable()
export class AuthorizationEffects {
  constructor(
    private dialog: MatDialog,
    private actions$: Actions,
    private authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType<fromAuthActions.LogiUserAction>(fromAuthActions.LOGIN_USER),
    mergeMap((_action) =>
      this.authorizationService
        .authenticateUser(
          _action.authData.userId,
          _action.authData.password,
          _action.authData.authCode
        )
        .pipe(
          map(
            (data) =>
              new fromAuthActions.LogiUserActionSuccess(
                data,
                _action.shouldRedirect
              )
          ),
          catchError((err) => of(new fromAuthActions.LogiUserActionFail(err)))
        )
    )
  )
);

onLoginSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType<fromAuthActions.LogiUserActionSuccess>(
        fromAuthActions.LOGIN_USER_SUCCESS
      ),
      tap((data) => {
        console.log("LOGIN SUCCESS")
        if (data.payload) {
          localStorage.setItem(
            USER_EMAIL_ELEMENT,
            data.payload.userData.user_login_elm!
          );
          localStorage.setItem(
            USER_PASSWORD_ELEMENT,
            data.payload.userData.user_pass_elm!
          );
          localStorage.setItem(USER_AUTH_CODE, data.payload.userData.user_auth_code!);
        }
        if (data.shouldRedirect) {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        }
      })
    ),
  { dispatch: false }
);

getDashboardData$ = createEffect(() =>
this.actions$.pipe(
  ofType<fromAuthActions.GetDashboardCardsData>(
    fromAuthActions.GET_DASHBOARD_CARDS_DATA
  ),
  mergeMap((_action) =>
    this.authService.getDashboardDetails().pipe(
      map((data) => new fromAuthActions.GetDashboardCardsDataSuccess(data)),
      catchError((err) =>
        of(new fromAuthActions.GetDashboardCardsDataFail(err))
      )
    )
  )
)
);


  updateAppBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.UpdateDashboardBanner>(
        fromAuthActions.UPDATE_BANNER_EVENT
      ),

      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddDashboardComponent, {
          data: {
            bannerData: action.payload,
          },
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.authService.updateAppBanner(dialogData.data as Banner).pipe(
              map(
                (data) => new fromAuthActions.UpdateDashboardBannerSuccess(data)
              ),
              catchError((err) =>
                of(new fromAuthActions.UpdateDashboardBannerFail(err))
              )
            )
          : of(new fromAuthActions.UpdateDashboardBannerFail('Dialog Closed'))
      )
    )
  );

  createAppBanner$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.CreateDashboardBanner>(
        fromAuthActions.CREATE_BANNER_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddDashboardComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.authService.addAppBanner(dialogData.data as Banner).pipe(
              map(
                (data) => new fromAuthActions.CreateDashboardBannerSuccess(data)
              ),
              catchError((err) =>
                of(new fromAuthActions.CreateDashboardBannerFail(err))
              )
            )
          : of(new fromAuthActions.CreateDashboardBannerFail('Dialog Closed'))
      )
    )
  );

  createItemType$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.CreateItemTypeEvent>(
        fromAuthActions.CREATE_ITEM_TYPE
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddItemTypeComponent);
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.authService.addItemType(dialogData.data as ItemType).pipe(
              map(
                (data) => new fromAuthActions.CreateItemTypeEventSuccess(data)
              ),
              catchError((err) =>
                of(new fromAuthActions.CreateItemTypeEventSuccess(err))
              )
            )
          : of(new fromAuthActions.CreateItemTypeEventFail('Dialog Closed'))
      )
    )
  );
  updateItemType$ = createEffect(() =>
  this.actions$.pipe(
    ofType<fromAuthActions.UpdateItemTypeEvent>(
      fromAuthActions.UPDATE_ITEM_TYPE
    ),
    exhaustMap((action) => {
      if(!action.isActionRequest){
      let dialogRef = this.dialog.open(AddItemTypeComponent, {
        data: {
          itemData: action.payload,
        },
      });
      return dialogRef.afterClosed();
    }return of({status:true,data:{...action.payload}})
    }),

    mergeMap((dialogData: DialogData) =>
      dialogData && dialogData.status
        ? this.authService.updateItemType(dialogData.data as ItemType).pipe(
            map(
              (data) => new fromAuthActions.UpdateItemTypeEventSuccess(data)
            ),
            catchError((err) =>
              of(new fromAuthActions.UpdateItemTypeEventSuccess(err))
            )
          )
        : of(new fromAuthActions.UpdateItemTypeEventFail('Dialog Closed'))
    )
  )
);
deleteItemData$ = createEffect(() =>
this.actions$.pipe(
  ofType<fromAuthActions.DeleteItemTypeEvent>(
    fromAuthActions.DELETE_ITEM_TYPE
  ),
  exhaustMap((action) => {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        data:{...action.payload},
        title:"Delete Category",
        description:"Are you Sure you want to delete this item Category?"
      }
    });
    return dialogRef.afterClosed();
  }),
  mergeMap((dialogData: DialogData) =>
    dialogData && dialogData.status
      ? this.authService.deleteItemType
          (dialogData.data as ItemType)
          .pipe(
            map(
              (data) =>
                new fromAuthActions.DeleteItemTypeEventSuccess(
                  data
                )
            ),
            catchError((err) =>
              of(
                new fromAuthActions.DeleteItemTypeEventFail(err)
              )
            )
          )
      : of(
          new fromAuthActions.DeleteItemTypeEventFail(
            'Dialog Closed by clicking outside'
          )
        )
  )
)
);

// changeStatusItemType$ = createEffect(() =>
// this.action$.pipe(

//   ofType<fromAuthActions.UpdateItemTypeEvent>(fromAuthActions.UPDATE_ITEM_TYPE),

//   mergeMap((action)=>
//   this.authService.updateItemType(action.payload).pipe(
//       map((data)=>new fromAuthActions.UpdateItemTypeEventSuccess(data)),
//       catchError(err=>of(new fromAuthActions.UpdateItemTypeEventFail(err)))
//   ))
// )
// );

  onDataAddedOrUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.CREATE_ITEM_TYPE_SUCCESS,
        fromAuthActions.CREATE_BANNER_EVENT_SUCCESS,
        fromAuthActions.UPDATE_BANNER_EVENT_SUCCESS,
        fromAuthActions.UPDATE_ITEM_TYPE_SUCCESS,
        fromAuthActions.DELETE_ITEM_TYPE_SUCCESS,

      ),
      map((data) => new fromAuthActions.GetDashboardCardsData())
    )
  );
}
