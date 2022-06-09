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
        _expand: ['band']
      }
    });
    

    return this.httpClient.get<Album[]>(url, {
      params: httpParams
    });
  }
  save$(album: Album): Observable<Album> {
    if (album.id) {
      return this.update$(album);
    } else {
      return this.create$(album);
    }
  }
  create$(album: Album): Observable<Album> {
    const url = 'http://localhost:3000/albums';

    album.createdAt = new Date();
    album.updatedAt = new Date();

    return this.httpClient.post<Album>(url, album);
  }
  update$(album: Album): Observable<Album> {
    const url = 'http://localhost:3000/albums/' + album.id;

    album.updatedAt = new Date();

    return this.httpClient.patch<Album>(url, album);
  }
  delete$(id: number): Observable<void> {
    const url = 'http://localhost:3000/albums/' + id;

    return this.httpClient.delete<void>(url);
  }
}
