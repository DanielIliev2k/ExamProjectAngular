import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/albums/models/album.model';
import { AlbumsService } from 'src/app/albums/services/albums.service';
import { Band } from 'src/app/bands/models/band.model';
import { BandsService } from 'src/app/bands/services/bands.service';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-songs-update',
  templateUrl: './songs-update.component.html',
  styleUrls: ['./songs-update.component.scss']
})
export class SongsUpdateComponent implements OnInit {

  formGroup!: FormGroup;

  song!: Song;
  bands!:Band[];
  albums!:Album[];

  saved = new EventEmitter<Song>();

  constructor(
    private albumsService: AlbumsService,
    private bandsService: BandsService,
    private songsService: SongsService,
    private bsModalRef: BsModalRef,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.getBands();
    this.getAlbums();
  }
  private getBands(): void {
    this.bandsService.getAll$().subscribe({
      next: (response) => {
        this.bands = response;
      }
    })
  }
  private getAlbums(): void {
    this.albumsService.getAll$().subscribe({
      next: (response) => {
        this.albums = response;
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
    
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const body: Song = {
      ...this.song,
      ...this.formGroup.value
    };

    this.songsService.save$(body).subscribe({
      next: (response) => {
        this.toastrService.success('Song was successfully saved.', 'Success');
        this.saved.emit(response);
        this.hideDialog();
      }
    })
  }

  private buildForm(): void {
    if (!this.song) {
      this.song = new Song();
    }

    this.formGroup = this.fb.group({
      name: [this.song.name, [Validators.required]],
      bandId: ['' , [Validators.required]],
      albumId: ['' , [Validators.required]]
    });
    
  }
}
