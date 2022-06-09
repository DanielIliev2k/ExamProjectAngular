import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsListComponent } from './songs/components/songs-list/songs-list.component';
import { AlbumsListComponent } from './albums/components/albums-list/albums-list.component';
import { BandsListComponent } from './bands/components/bands-list/bands-list.component';
import { SongsDeleteComponent } from './songs/components/songs-delete/songs-delete.component';
import { SongsUpdateComponent } from './songs/components/songs-update/songs-update.component';
import { BandsDeleteComponent } from './bands/components/bands-delete/bands-delete.component';
import { BandsUpdateComponent } from './bands/components/bands-update/bands-update.component';
import { AlbumsDeleteComponent } from './albums/components/albums-delete/albums-delete.component';
import { AlbumsUpdateComponent } from './albums/components/albums-update/albums-update.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BandsDeleteErrorComponent } from './bands/components/band-delete-error/bands-delete-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumsDeleteErrorComponent } from './albums/components/albums-delete-error/albums-delete-error.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    AlbumsListComponent,
    BandsListComponent,
    SongsDeleteComponent,
    SongsUpdateComponent,
    BandsDeleteComponent,
    BandsUpdateComponent,
    AlbumsDeleteComponent,
    AlbumsUpdateComponent,
    BandsDeleteErrorComponent,
    AlbumsDeleteErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
