import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-songs-delete',
  templateUrl: './songs-delete.component.html',
  styleUrls: ['./songs-delete.component.scss']
})
export class SongsDeleteComponent {

  song!: Song;

  songDeleted = new EventEmitter<void>();

  constructor(private songService: SongsService,
              private bsModalRef: BsModalRef,
              private toastrService: ToastrService) {
  }

  deleteCategory(): void {
    this.songService.delete$(this.song.id).subscribe({
      next: () => {
        this.toastrService.success('Song was successfully deleted.', 'Success');
        this.hideDialog();
        this.songDeleted.emit();
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }

}
