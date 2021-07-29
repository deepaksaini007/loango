import { Action } from '@ngrx/store';
import { MODULE_ID } from './loading.constant';
import { LoadingAction } from './loading.model';

export enum ActionTypes {
  Add = '[@fx/ngrx/loading] Add',
  Remove = '[@fx/ngrx/loading] Remove'
}

export class Add implements Action, Partial<LoadingAction> {
  readonly type = ActionTypes.Add;
  paisaRupeeLoading: { add: string };
  constructor(add: string) { 
    this.paisaRupeeLoading = { add };
  }
}

export class Remove implements Action, Partial<LoadingAction> {
  readonly type = ActionTypes.Remove;
  paisaRupeeLoading: { remove: string };
  constructor(remove: string) {
    this.paisaRupeeLoading = { remove };
  }
}

export type Actions = Add | Remove;