import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Band } from '../../models/band.model';
import { BandsService } from '../../services/bands.service';

@Component({
  selector: 'app-bands-delete',
  templateUrl: './bands-delete.component.html',
  styleUrls: ['./bands-delete.component.scss']
})
export class BandsDeleteComponent {

  band!: Band;

  bandDeleted = new EventEmitter<void>();

  constructor(private bandsService: BandsService,
              private bsModalRef: BsModalRef,
              private toastrService: ToastrService) {
  }

  deleteBand(): void {
    this.bandsService.delete$(this.band.id).subscribe({
      next: () => {
        this.toastrService.error('Band  ' + '"' + this.band.name + '"' + ' was successfully deleted.', 'Success');
        this.hideDialog();
        this.bandDeleted.emit();
      }
    })
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
