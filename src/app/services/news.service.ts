import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { singleNew } from '../interfaces/news-interface';

// TODO: разнести запросы по отдельным сервисам
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:8000'; // https://eneikapi.onrender.com

  constructor(private http: HttpClient) { }

  async getToken(): Promise<string | null> {
    const url = `${this.baseUrl}/auth/jwt/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: 'root',
      password: 'Kutaisi2023',
    };

    try {
      const response = await firstValueFrom(this.http.post<any>(url, body, { headers }));
      return response?.access;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async getNews(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/news/?count=${limit}&start=${offset}`;

    const token = await this.getToken();
    console.log('Token: ', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  async getNewsById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/news/${id}`;
    const token = await this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<singleNew>(url, { headers });
  }


  async getStories(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/stories/?count=${limit}&start=${offset}`;

    const token = await this.getToken();
    console.log('Token: ', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  async gettSoriesById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/stories/${id}`;
    const token = await this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<singleNew>(url, { headers });
  }

  async getArts(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/arts/?count=${limit}&start=${offset}`;

    const token = await this.getToken();
    console.log('Token: ', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  async getArtsById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/arts/${id}`;
    const token = await this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<singleNew>(url, { headers });
  }

  async getAds(limit: number = 20, offset:number = 0): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/advertisments/?count=${limit}&start=${offset}`;

    const token = await this.getToken();
    console.log('Token: ', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  async getAdsById(id: number): Promise<Observable<singleNew>> {
    const url = `${this.baseUrl}/api/v1/advertisments/${id}`;
    const token = await this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<singleNew>(url, { headers });
  }
}

