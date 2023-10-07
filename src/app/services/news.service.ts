import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { singleNew } from '../interfaces/news-interface';
import { singleStory } from '../interfaces/stories-interface'
import { singleThing } from '../interfaces/things-interface';
import { AuthService } from './auth.service';

// TODO: разнести запросы по отдельным сервисам
@Injectable({
  providedIn: 'root'
})


export class NewsService{
  private baseUrl = 'http://194.67.111.147:8000'; // https://eneikapi.onrender.com
  auth: Promise<string | null>;

  constructor(private http: HttpClient) {
    this.auth = new AuthService(http).verifyToken();
  }

  async getNews(limit: number = 20, offset: number = 0): Promise<Observable<any[]>> {
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


  async getStories(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/stories/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleStory[]>(url, { headers });
  }

  async getStoriesById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/stories/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleStory>(url, { headers });
  }

  async getArts(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/arts/?count=${limit}&start=${offset}`;


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(url, { headers });
  }

  async getArtsById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/arts/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleNew>(url, { headers });
  }

  async getAds(limit: number = 20, offset: number = 0): Promise<Observable<singleThing[]>> {
    const url = `${this.baseUrl}/api/v1/advertisments/?count=${limit}&start=${offset}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleThing[]>(url, { headers });
  }

  async getAdsById(id: number): Promise<Observable<singleThing>> {
    const url = `${this.baseUrl}/api/v1/advertisments/${id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<singleThing>(url, { headers });
  }
}

