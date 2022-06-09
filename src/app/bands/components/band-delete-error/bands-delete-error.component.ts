import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-band-delete-error',
  templateUrl: './bands-delete-error.component.html',
  styleUrls: ['./bands-delete-error.component.scss']
})
export class BandsDeleteErrorComponent implements OnInit {

  constructor(
    private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
