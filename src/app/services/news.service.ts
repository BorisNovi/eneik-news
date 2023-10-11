import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { singleNew } from '../interfaces/news-interface';
import { singleStory } from '../interfaces/stories-interface';
import { singleThing } from '../interfaces/things-interface';
import { AuthService } from './auth.service';
import { singleArt } from '../interfaces/arts-interface';

// TODO: разнести запросы по отдельным сервисам
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'https://eneik-media.com'; // https://eneikapi.onrender.com
  auth: Promise<string | null>;

  constructor(private http: HttpClient) {
    this.auth = new AuthService(http).verifyToken();
  }

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

  async getStories(limit = 20, offset = 0): Promise<Observable<singleStory[]>> {
    const url = `${this.baseUrl}/api/v1/stories/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleStory[]>(url, { headers });
  }

  async getStoriesById(id: number): Promise<Observable<singleStory>> {
    const url = `${this.baseUrl}/api/v1/stories/${id}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleStory>(url, { headers });
  }

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
