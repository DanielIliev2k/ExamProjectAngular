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

    return this.httpClient.get<Song[]>(url);
  }
}
