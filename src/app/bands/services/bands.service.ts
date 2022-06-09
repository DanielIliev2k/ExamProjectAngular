import { HttpClient, HttpParams } from '@angular/common/http';
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
  save$(band: Band): Observable<Band> {
    if (band.id) {
      return this.update$(band);
    } else {
      return this.create$(band);
    }
  }
  create$(band: Band): Observable<Band> {
    const url = 'http://localhost:3000/bands';

    band.createdAt = new Date();
    band.updatedAt = new Date();

    return this.httpClient.post<Band>(url, band);
  }
  update$(band: Band): Observable<Band> {
    const url = 'http://localhost:3000/bands/' + band.id;

    band.updatedAt = new Date();

    return this.httpClient.patch<Band>(url, band);
  }
  delete$(id: number): Observable<void> {
    const url = 'http://localhost:3000/bands/' + id;

    return this.httpClient.delete<void>(url);
  }
}