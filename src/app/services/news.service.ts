import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { singleNew } from '../interfaces/news-interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'https://eneik-media.com'; // https://eneikapi.onrender.com
  constructor(private http: HttpClient) {}

  async getNews(limit = 20, offset = 0): Promise<Observable<singleNew[]>> {
    const url = `${this.baseUrl}/api/v1/news/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<singleNew[]>(url, { headers });
  }

  async getNewsById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/news/${id}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleNew>(url, { headers });
  }
}
