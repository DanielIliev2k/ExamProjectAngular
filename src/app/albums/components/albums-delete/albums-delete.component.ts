import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-albums-delete',
  templateUrl: './albums-delete.component.html',
  styleUrls: ['./albums-delete.component.scss']
})
export class AlbumsDeleteComponent  {
  album!: Album;

  albumDeleted = new EventEmitter<void>();

  constructor(private albumsService: AlbumsService,
              private bsModalRef: BsModalRef,
              private toastrService: ToastrService) {
  }

  deleteAlbum(): void {
    this.albumsService.delete$(this.album.id).subscribe({
      next: () => {
        this.toastrService.error('Album ' + '"' + this.album.name + '"' + ' was successfully deleted.', 'Success');
        this.hideDialog();
        this.albumDeleted.emit();
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
