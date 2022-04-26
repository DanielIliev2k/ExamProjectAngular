import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from '../models/band.model';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  
    constructor(private httpClient: HttpClient) {
  }

  getAll$(): Observable<Band[]> {
    const url = 'http://localhost:3000/bands';

    return this.httpClient.get<Band[]>(url);
  }
}