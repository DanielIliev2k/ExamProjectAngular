import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Song } from 'src/app/songs/models/song.model';
import { SongsService } from 'src/app/songs/services/songs.service';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';
import { AlbumsDeleteErrorComponent } from '../albums-delete-error/albums-delete-error.component';
import { AlbumsDeleteComponent } from '../albums-delete/albums-delete.component';
import { AlbumsUpdateComponent } from '../albums-update/albums-update.component';
import { sortAlbums } from 'scripts/sortAlbums';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  albums!:Album[];
  songs!:Song[];
  refferenceExists!:boolean;

  constructor(private albumService: AlbumsService,
    private songsService: SongsService,
    private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.getAll();
    this.getSongs();
  }
  public sort(n:number):void{
    sortAlbums(n);
  }
  private getAll(): void {
    this.albumService.getAll$().subscribe({
      next: (response) => {
        this.albums = response;
      }
    })
    this.refferenceExists=false;
  }
  private getSongs(){
    this.songsService.getAll$().subscribe({
      next: (response) => {
        this.songs = response;
      }
    })
  }
  private checkRefferences(currentAlbumId:number){
    this.songs.forEach(song => {
      if(song.albumId == currentAlbumId){
        this.refferenceExists = true;
      }
    });
  }
  onCreateClick(): void {
    this.onUpdateClick();
  }

  onUpdateClick(album?: Album): void {
    const ref = this.bsModalService.show(AlbumsUpdateComponent, {
      initialState: {
        album: album
      }
    });

    if (ref.content) {
      ref.content.saved.subscribe({
        next: () => {
          this.getAll();
        }
      });
    }
  }

  onDeleteClick(album: Album): void {
    this.checkRefferences(album.id);
    if (!this.refferenceExists){
      const ref = this.bsModalService.show(AlbumsDeleteComponent, {
        initialState: {
          album: album
        }
      })

      if (ref.content) {
        ref.content.albumDeleted.subscribe({
          next: () => {
            this.getAll();
          }
        })
      }
    }
    else{
      const ref = this.bsModalService.show(AlbumsDeleteErrorComponent);
    }
  }

}
