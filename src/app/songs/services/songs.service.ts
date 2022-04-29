import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
    constructor(private httpClient: HttpClient) {
  }

  getAll$(): Observable<Song[]> {
    const url = 'http://localhost:3000/songs';
    const httpParams = new HttpParams({
      fromObject: {
        _expand: ['band','album']
      }
    });
    

    return this.httpClient.get<Song[]>(url, {
      params: httpParams
    });
  }
  
  save$(song: Song): Observable<Song> {
    if (song.id) {
      return this.update$(song);
    } else {
      return this.create$(song);
    }
  }
  create$(song: Song): Observable<Song> {
    const url = 'http://localhost:3000/songs';

    song.createdAt = new Date();
    song.updatedAt = new Date();

    return this.httpClient.post<Song>(url, song);
  }
  update$(song: Song): Observable<Song> {
    const url = 'http://localhost:3000/songs/' + song.id;

    song.updatedAt = new Date();

    return this.httpClient.patch<Song>(url, song);
  }
  delete$(id: number): Observable<void> {
    const url = 'http://localhost:3000/songs/' + id;

    return this.httpClient.delete<void>(url);
  }
}
