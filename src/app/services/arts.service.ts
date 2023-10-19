import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { singleArt } from '../interfaces/arts-interface';

@Injectable({
  providedIn: 'root',
})
export class ArtsService {
  private baseUrl = 'https://eneik-media.com';
  constructor(private http: HttpClient) {}

  async getArts(limit = 20, offset = 0): Promise<Observable<singleArt[]>> {
    const url = `${this.baseUrl}/api/v1/arts/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleArt[]>(url, { headers });
  }

  async getArtsById(id: number): Promise<Observable<singleArt>> {
    const url = `${this.baseUrl}/api/v1/arts/${id}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleArt>(url, { headers });
  }
}
