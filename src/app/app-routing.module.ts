import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsListComponent } from './albums/components/albums-list/albums-list.component';
import { BandsListComponent } from './bands/components/bands-list/bands-list.component';
import { SongsListComponent } from './songs/components/songs-list/songs-list.component';

const routes: Routes = [
  {
    path: 'songs',
    component: SongsListComponent
  },
  {
    path: 'albums',
    component: AlbumsListComponent
  },
  {
    path: 'bands',
    component: BandsListComponent
  },
  {
  path: '',
  redirectTo: 'songs',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
