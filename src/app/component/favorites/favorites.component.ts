import { Component, OnInit } from '@angular/core';
import { FavoriteList } from '../../types';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditFavoriteListComponent } from './edit-favorite-list/edit-favorite-list.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favImageSet: any[];
  bsModalRef: BsModalRef;
  imagesStoreSet: Observable<FavoriteList[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<{ favorite: FavoriteList[] }>
  ) {}

  ngOnInit(): void {
    this.imagesStoreSet = this.store.pipe(select('favorite'));
  }

  /**
   * @param { object } image
   */
   downloadImage(image): void {
    const anchor = document.createElement('a');
    anchor.setAttribute(
      'href',
      'data:application/octet-stream;base64' +
        encodeURIComponent(image['downloadUrl'])
    );
    anchor.setAttribute('download', 'download.jpeg');
    anchor.click();
  }

  /**
   * @param { object } image
   * @param { number } index
   */
   editFavoriteList(image, index): void {
    const initialState = { selectedImage: image, selectedIndex: index };
    this.bsModalRef = this.modalService.show(EditFavoriteListComponent, {
      initialState,
    });
  }
}
