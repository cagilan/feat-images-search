import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FetchImagesService {
  private url = environment.api.url;
  private applicationId = environment.api.key;
  searchEvent: EventEmitter<any> = new EventEmitter();
  page = 1;
  per_page = 25;
  cache = {};
  constructor(private http: HttpClient) {}

  /**
   * @param {string} query
   * @param {number} page
   */
  searchForImageBasedOnQuery(query, page: number) {
    if (query?.length === 0) {
      this.searchEvent.emit('clear');
      return;
    }

    this.searchEvent.emit({ loading: true, page: page, query: query });
    let url = `${this.url}/search/photos?client_id=${this.applicationId}`;
    url += `&page=${page}&per_page=${this.per_page}&query=${query}`;

    return this.http
      .get(url)
      .pipe(map((res) => res))
      .subscribe((images) => {
        this.searchEvent.emit(images);
      });
  }

  /**
   * @param {number} page
   * @returns {Observable<R|T>}
   */
  random(page): Observable<any[]> {
    return this.http
      .get<any[]>(
        this.url +
          '/photos?client_id=' +
          this.applicationId +
          '&page=' +
          page +
          '&per_page=' +
          this.per_page
      )
      .pipe(map((res) => res));
  }

  /**
   * Return a listener to Search Event.
   * @returns {EventEmitter<any>}
   */
  getImageSearchEvent() {
    return this.searchEvent;
  }
}
