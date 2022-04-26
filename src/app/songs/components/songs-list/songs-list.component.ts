import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  songs!:Song[];

  constructor(private songsService: SongsService) { }

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
}
