import { Component, OnInit } from '@angular/core';
import { FetchImagesService } from '../shared/services/fetch-images.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddFavoriteListComponent } from '../favorites/add-favorite-list/add-favorite-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  errorMessage = '';
  searchEvent: any;
  searchQuery = '';
  page = 0;
  total = 0;
  total_pages = 0;
  searchActive = false;
  imageBox: any[] = [];
  bsModalRef: BsModalRef;
  constructor(
    private imageService: FetchImagesService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.random();
    this.searchImage();
  }

  random() {
    this.loading = true;
    this.page += 1;
    this.errorMessage = '';
    this.imageService.random(this.page).subscribe(
      (images) => {
        this.imageBox.push(images);
        this.loading = false;
        this.errorMessage = '';
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Oops! Something went wrong. Please try again.';
      }
    );
  }

  searchImage() {
    this.errorMessage = '';
    this.searchEvent = this.imageService.getImageSearchEvent().subscribe(
      (value) => {
        this.searchActive = true;
        if (value.hasOwnProperty('loading') && value.page === 0) {
          this.imageBox = [];
          this.page = 0;
          this.searchQuery = value.query;
          this.loading = true;
        } else if (value.hasOwnProperty('loading')) {
          this.loading = true;
        } else if (value.hasOwnProperty('results')) {
          this.loading = false;
          if (value.results.length) {
            this.total = value.total;
            this.total_pages = value.total_pages;
            this.imageBox.push(value.results);
            this.page += 1;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'No records found';
          }
        } else {
          this.searchActive = false;
          this.errorMessage = '';
          this.page = 0;
          this.searchQuery = '';
          this.imageBox = [];
          this.random();
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
      }
    );
  }

  loadMore() {
    if (!this.searchActive) {
      this.random();
      return;
    }
    this.imageService.searchForImageBasedOnQuery(this.searchQuery, this.page);
  }

  /**
   * @param { object } image
   */
  getData(image) {
    return `
    <span>Author: ${image.user.name} </span> </br>
    <span><a href="${image.user.links.self}">${image.user.links.self}</a>`;
  }

  /**
   * @param { object } image
   */
  markAsFavorite(image) {
    const initialState = { selectedImage: image };
    this.bsModalRef = this.modalService.show(AddFavoriteListComponent, {
      initialState,
    });
  }
}
