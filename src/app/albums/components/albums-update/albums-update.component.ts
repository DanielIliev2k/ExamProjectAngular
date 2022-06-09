import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Band } from 'src/app/bands/models/band.model';
import { BandsService } from 'src/app/bands/services/bands.service';
import { Album } from '../../models/album.model';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-albums-update',
  templateUrl: './albums-update.component.html',
  styleUrls: ['./albums-update.component.scss']
})
export class AlbumsUpdateComponent implements OnInit {

  formGroup!: FormGroup;

  album!:Album;
  bands!: Band[];

  saved = new EventEmitter<Album>();

  constructor(
    private albumsService: AlbumsService,
    private bsModalRef: BsModalRef,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private bandsService: BandsService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.getBands();
  }
 
  private getBands(): void {
    this.bandsService.getAll$().subscribe({
      next: (response) => {
        this.bands = response;
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

    const body: Album = {
      ...this.album,
      ...this.formGroup.value
    };

    this.albumsService.save$(body).subscribe({
      next: (response) => {
        this.toastrService.success('Album was successfully saved.', 'Success');
        this.saved.emit(response);
        this.hideDialog();
      }
    })
  }

  private buildForm(): void {
    if (!this.album) {
      this.album = new Album();
    }

    this.formGroup = this.fb.group({
      name: [this.album.name, [Validators.required]],
      bandId: ['' , [Validators.required]],
      yearReleased: [this.album.yearReleased , [Validators.required, Validators.min(1900),Validators.max(2022)]],
    });
    
  }
}
