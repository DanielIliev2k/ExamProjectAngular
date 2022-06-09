import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Album } from 'src/app/albums/models/album.model';
import { Band } from '../../models/band.model';
import { BandsService } from '../../services/bands.service';

@Component({
  selector: 'app-bands-update',
  templateUrl: './bands-update.component.html',
  styleUrls: ['./bands-update.component.scss']
})
export class BandsUpdateComponent implements OnInit {

  formGroup!: FormGroup;

  band!:Band;
  albums!:Album[];

  saved = new EventEmitter<Band>();

  constructor(
    private bandsService: BandsService,
    private bsModalRef: BsModalRef,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

   
  }
  

  hideDialog(): void {
    this.bsModalRef.hide();
    
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const body: Band = {
      ...this.band,
      ...this.formGroup.value
    };

    this.bandsService.save$(body).subscribe({
      next: (response) => {
        this.toastrService.success('Band was successfully saved.', 'Success');
        this.saved.emit(response);
        this.hideDialog();
      }
    })
  }

  private buildForm(): void {
    if (!this.band) {
      this.band = new Band();
    }

    this.formGroup = this.fb.group({
      name: [this.band.name, [Validators.required]],
      yearFormed: [this.band.yearFormed , [Validators.required, Validators.min(1900),Validators.max(2022)]],
      members:[this.band.members,[Validators.required]]
    });
    
  }

}
