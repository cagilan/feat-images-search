import * as FavoriteActions from '../actions/favorite.actions';
import { FavoriteList } from '../types';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export function reducer(
  state: FavoriteList[] = [],
  action: FavoriteActions.Actions
) {
  switch (action.type) {
    case FavoriteActions.FavoriteActionTypes.ADD_FAVORITE_IMAGE: {
      return [...state, action.payload];
    }

    case FavoriteActions.FavoriteActionTypes.ADD_IMAGE_TO_FAVORITE_IMAGE_LIST: {
      state[action.index].links.push(action.payload);
      return state;
    }

    case FavoriteActions.FavoriteActionTypes.UPDATE_IMAGE_NAME: {
      state[action.index].name = action.payload.name;
      state[action.index].desc = action.payload.desc;
      return state;
    }

    default: {
      return state;
    }
  }
}

export const getList = createFeatureSelector('favorite');
export const getFavListNames = createSelector(
  getList,
  (favorite) => favorite || [].map((item) => item.name)
);
