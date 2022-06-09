import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Album } from 'src/app/albums/models/album.model';
import { AlbumsService } from 'src/app/albums/services/albums.service';
import { Song } from 'src/app/songs/models/song.model';
import { SongsService } from 'src/app/songs/services/songs.service';
import { Band } from '../../models/band.model';
import { BandsService } from '../../services/bands.service';
import { BandsDeleteErrorComponent } from '../band-delete-error/bands-delete-error.component';
import { BandsDeleteComponent } from '../bands-delete/bands-delete.component';
import { BandsUpdateComponent } from '../bands-update/bands-update.component';
import { sortBands } from 'scripts/sortBands';

@Component({
  selector: 'app-bands-list',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.scss']
})
export class BandsListComponent implements OnInit {

  bands!:Band[];
  songs!:Song[];
  albums!:Album[];
  refferenceExists!:boolean;

  constructor(private bandsService: BandsService,
    private songsService: SongsService,
    private albumsService: AlbumsService,
    private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAlbums();
    this.getSongs();
  }
  public sort(n:number):void{
    sortBands(n);
  }
  private getSongs(){
    this.songsService.getAll$().subscribe({
      next: (response) => {
        this.songs = response;
      }
    })
  }
  private getAlbums(){
    this.albumsService.getAll$().subscribe({
      next: (response) => {
        this.albums = response;
      }
    })
  }
  private checkRefferences(currentBandId:number){
    this.songs.forEach(song => {
      if(song.bandId == currentBandId){
        this.refferenceExists = true;
      }
    });
    this.albums.forEach(album => {
      if(album.bandId == currentBandId){
        this.refferenceExists = true;
      }
    });
  }
 
  private getAll(): void {
    this.bandsService.getAll$().subscribe({
      next: (response) => {
        this.bands = response;
      }
    })
    this.refferenceExists=false;
  }
  onCreateClick(): void {
    this.onUpdateClick();
  }

  onUpdateClick(band?: Band): void {
    const ref = this.bsModalService.show(BandsUpdateComponent, {
      initialState: {
        band: band
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

  onDeleteClick(band: Band): void {
    this.checkRefferences(band.id);
    if (!this.refferenceExists){
      const ref = this.bsModalService.show(BandsDeleteComponent, {
        initialState: {
          band: band
        }
      })

      if (ref.content) {
        ref.content.bandDeleted.subscribe({
          next: () => {
            this.getAll();
          }
        })
      }
    }
    else{
      const ref = this.bsModalService.show(BandsDeleteErrorComponent);
    }
  }
}
