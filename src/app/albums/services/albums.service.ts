import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private httpClient: HttpClient) {
  }

  getAll$(): Observable<Album[]> {
    const url = 'http://localhost:3000/albums';
    const httpParams = new HttpParams({
      fromObject: {
        _expand: ['band','song']
      }
    });
    

    return this.httpClient.get<Album[]>(url, {
      params: httpParams
    });
  }
}
