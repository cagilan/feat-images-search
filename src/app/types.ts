export interface FavoriteList {
  name: string;
  desc: string;
  links: ImageDetails[];
}

export interface ImageDetails {
  url: string;
  downloadUrl: string;
}
