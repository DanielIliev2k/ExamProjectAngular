import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-albums-delete-error',
  templateUrl: './albums-delete-error.component.html',
  styleUrls: ['./albums-delete-error.component.scss']
})
export class AlbumsDeleteErrorComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  hideDialog(): void {
    this.bsModalRef.hide();
  }
}
