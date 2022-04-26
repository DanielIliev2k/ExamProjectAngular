import { Component, OnInit } from '@angular/core';
import { Band } from '../../models/band.model';
import { BandsService } from '../../services/bands.service';

@Component({
  selector: 'app-bands-list',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.scss']
})
export class BandsListComponent implements OnInit {

  bands!:Band[];

  constructor(private bandService: BandsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.bandService.getAll$().subscribe({
      next: (response) => {
        this.bands = response;
      }
    })
  }

}
