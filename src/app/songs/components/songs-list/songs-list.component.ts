import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';
import { SongsUpdateComponent } from '../songs-update/songs-update.component';
import { SongsDeleteComponent } from '../songs-delete/songs-delete.component';
import { sortSongs } from 'scripts/sortSongs';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  songs!:Song[];

  constructor(
    private songsService: SongsService,
    private bsModalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.songsService.getAll$().subscribe({
      next: (response) => {
        this.songs = response;
      }
    })
  }
  onCreateClick(): void {
    this.onUpdateClick();
  }
  public sort(n:number):void{
    sortSongs(n);
  }

  onUpdateClick(song?: Song): void {
    const ref = this.bsModalService.show(SongsUpdateComponent, {
      initialState: {
        song: song
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

  onDeleteClick(song: Song): void {
    const ref = this.bsModalService.show(SongsDeleteComponent, {
      initialState: {
        song: song
      }
    })

    if (ref.content) {
      ref.content.songDeleted.subscribe({
        next: () => {
          this.getAll();
        }
      })
    }
  }
  
}
