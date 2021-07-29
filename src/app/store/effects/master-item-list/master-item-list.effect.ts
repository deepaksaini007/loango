import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
// import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { DialogData } from 'src/app/core/data-models/dialog-data/dialog-data.model';
import { AllMasterItemData } from 'src/app/core/data-models/master-item-list/master-item-list.data';
import { MasterItemService } from 'src/app/core/services/MasterItem/master-item.service';
import { AddItemComponent } from 'src/app/shared/dialogs/add-item/add-item.component';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import * as fromMasterItemListActions from '../../actions/master-item-list';
//import all requried services or any dependencies

@Injectable()
export class MasterItemListEffects {
  constructor(
    private actions$: Actions,
    private masterItemListService: MasterItemService,
    private dialog: MatDialog
  ) {}

  getMasterItemList$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterItemListActions.LoadMasterItemData>(
        fromMasterItemListActions.MASTER_ITEM_LIST_EVENT
      ),
      mergeMap((action) => {
        return this.masterItemListService.getMasterItemData().pipe(
          map(
            (data) =>
              new fromMasterItemListActions.LoadMasterItemDataSuccess(data)
          ),
          catchError((err) =>
            of(new fromMasterItemListActions.LoadMasterItemDataFail(err))
          )
        );
      })
    )
  );

  deleteMasterItemData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterItemListActions.DeleteMasterItemData>(
        fromMasterItemListActions.DELETE_MASTER_ITEM_LIST_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
          data:{
            data:{...action.payload},
            title:"Delete Item",
            description:"Are you Sure you want to delete this item?"
          }
        });
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.masterItemListService
              .deleteMasterItemDataRecord(dialogData.data as AllMasterItemData)
              .pipe(
                map(
                  (data) =>
                    new fromMasterItemListActions.DeleteMasterItemDataSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(
                    new fromMasterItemListActions.DeleteMasterItemDataFail(err)
                  )
                )
              )
          : of(
              new fromMasterItemListActions.DeleteMasterItemDataFail(
                'Dialog Closed by clicking outside'
              )
            )
      )
    )
  );

  createMasterItemData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterItemListActions.CreateMasterItemData>(
        fromMasterItemListActions.CREATE_MASTER_ITEM_LIST_EVENT
      ),
      exhaustMap((action) => {
        let dialogRef = this.dialog.open(AddItemComponent,{
         data:{
           categoryName:action.categoryName
         }
        });
       
        return dialogRef.afterClosed();
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.masterItemListService
              .createNewMasterItemData(dialogData.data as AllMasterItemData)
              .pipe(
                map(
                  (data) =>
                    new fromMasterItemListActions.CreateMasterItemDataSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(
                    new fromMasterItemListActions.CreateMasterItemDataFail(err)
                  )
                )
              )
          : of(
              new fromMasterItemListActions.CreateMasterItemDataFail(
                'Dialog Closed by clicking outside'
              )
            )
      )
    )
  );

  updateMasterItemData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromMasterItemListActions.UpdateMasterItemData>(
        fromMasterItemListActions.UPDATE_MASTER_ITEM_LIST_EVENT
      ),
      exhaustMap((action) => {
        if(!action.isActiveStatusChanged){
        let dialogRef = this.dialog.open(AddItemComponent, {
          data: {
            itemData: action.payload,
          },
        });
        return dialogRef.afterClosed();
      }else{
        return of({status:true,data:{...action.payload}})
      }
      }),
      mergeMap((dialogData: DialogData) =>
        dialogData && dialogData.status
          ? this.masterItemListService
              .updateMasterItemDataRecord(dialogData.data as AllMasterItemData)
              .pipe(
                map(
                  (data) =>
                    new fromMasterItemListActions.UpdateMasterItemDataSuccess(
                      data
                    )
                ),
                catchError((err) =>
                  of(
                    new fromMasterItemListActions.UpdateMasterItemDataFail(err)
                  )
                )
              )
          : of(
              new fromMasterItemListActions.UpdateMasterItemDataFail(
                'Dialog Closed'
              )
            )
      )
    )
  );


  onDataAddedOrUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMasterItemListActions.CREATE_MASTER_ITEM_LIST_EVENT_SUCCESS,
        fromMasterItemListActions.UPDATE_MASTER_ITEM_LIST_EVENT_SUCCESS,
        fromMasterItemListActions.DELETE_MASTER_ITEM_LIST_EVENT_SUCCESS
      ),
      map((data) => new fromMasterItemListActions.LoadMasterItemData())
    )
  );
}
