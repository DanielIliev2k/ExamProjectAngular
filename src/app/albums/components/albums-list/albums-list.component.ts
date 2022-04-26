import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/songs/models/song.model';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  albums!:Album[];
  songs!:Song[];

  constructor(private albumService: AlbumsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.albumService.getAll$().subscribe({
      next: (response) => {
        this.albums = response;
      }
    })
  }

}
