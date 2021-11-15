import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FetchImagesService } from '../../shared/services/fetch-images.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query = '';
  queryChanged: Subject<string> = new Subject<string>();
  constructor(private imageService: FetchImagesService) {}

  ngOnInit() {
    this.queryChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.query = query;
        this.imageService.searchForImageBasedOnQuery(this.query, 0);
      });
  }

  /**
   * @param { string } text
   */
   searchImage(text: string): void {
    this.queryChanged.next(text);
  }
}
