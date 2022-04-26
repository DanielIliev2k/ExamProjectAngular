import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsListComponent } from './songs/components/songs-list/songs-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlbumsListComponent } from './albums/components/albums-list/albums-list.component';
import { BandsListComponent } from './bands/components/bands-list/bands-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    AlbumsListComponent,
    BandsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
