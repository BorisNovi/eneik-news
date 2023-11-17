import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { singleNew, postNew } from '../models/news-interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'https://eneik-media.com';
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

  async postNew(
    newContent: postNew,
    accessToken: string | null
  ): Promise<postNew> {
    const url = `${this.baseUrl}/api/v1/news/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      ...newContent,
    };

    try {
      const response = await firstValueFrom(
        this.http.post<postNew>(url, body, { headers })
      );
      return response;
    } catch (error) {
      console.error('Error posting news:', error);
      throw error;
    }
  }
}
