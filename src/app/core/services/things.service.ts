import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { singleThing } from '../models/things-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  private baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  async getThings(limit = 20, offset = 0): Promise<Observable<singleThing[]>> {
    const url = `${this.baseUrl}/api/v1/things/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleThing[]>(url, { headers });
  }

  async getThingsById(id: number): Promise<Observable<singleThing>> {
    const url = `${this.baseUrl}/api/v1/things/${id}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleThing>(url, { headers });
  }
}
