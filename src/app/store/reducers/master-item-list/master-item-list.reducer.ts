import { Action, createReducer, on } from '@ngrx/store';
import {
  AllMasterItemData,
  MasterItemListData,
} from 'src/app/core/data-models/master-item-list/master-item-list.data';
import * as fromMasterListActions from '../../actions/master-item-list';

export interface MasterItemListState {
  allMasterItemsData?: MasterItemListData;
}

export const initialState: MasterItemListState = {
  allMasterItemsData: undefined,
};

export function masterItemReducer(
  state: MasterItemListState = initialState,
  action: fromMasterListActions.MasterListActions
): MasterItemListState {
  switch (action.type) {
    case fromMasterListActions.MASTER_ITEM_LIST_EVENT_SUCCESS:
      return {
        ...state,
        allMasterItemsData: action.payload,
      };

    default:
      return state;
  }
}


export const selectMasterItemData = (state: MasterItemListState) => state.allMasterItemsData;
