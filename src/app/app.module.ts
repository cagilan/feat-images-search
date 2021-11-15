import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/global/header/header/header.component';
import { FooterComponent } from './component/global/footer/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/global/search/search.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddFavoriteListComponent } from './component/favorites/add-favorite-list/add-favorite-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFavoriteListComponent } from './component/favorites/edit-favorite-list/edit-favorite-list.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/favorite.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    FavoritesComponent,
    AddFavoriteListComponent,
    EditFavoriteListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoadingBarHttpClientModule,
    HttpClientModule,
    InfiniteScrollModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    StoreModule.forRoot({ favorite: reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
