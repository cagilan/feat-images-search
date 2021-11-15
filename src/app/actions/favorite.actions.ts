import { Action } from '@ngrx/store';
import { FavoriteList } from '../types';

export enum FavoriteActionTypes {
  ADD_FAVORITE_IMAGE = '[Favorite Page] add image list',
  ADD_IMAGE_TO_FAVORITE_IMAGE_LIST = '[Favorite Page] add image to list',
  UPDATE_IMAGE_NAME = 'update image name and desc by ID',
}

export class AddFavoriteImageList implements Action {
  readonly type = FavoriteActionTypes.ADD_FAVORITE_IMAGE;
  constructor(public payload: FavoriteList) {}
}

export class AddImageLinkToFavoriteList implements Action {
  readonly type = FavoriteActionTypes.ADD_IMAGE_TO_FAVORITE_IMAGE_LIST;
  constructor(
    public payload: { url: string; downloadUrl: string },
    public index: number
  ) {}
}

export class UpdateImageListName implements Action {
  readonly type = FavoriteActionTypes.UPDATE_IMAGE_NAME;
  constructor(
    public payload: { name: string; desc: string },
    public index: number
  ) {}
}

export type Actions =
  | AddFavoriteImageList
  | AddImageLinkToFavoriteList
  | UpdateImageListName;
