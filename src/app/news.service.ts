import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://192.168.0.112:8000'; // https://eneikapi.onrender.com

  constructor(private http: HttpClient) {}

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

  async getNews(): Promise<Observable<any[]>> {
    const url = `${this.baseUrl}/api/v1/news/`;

    const token = await this.getToken();
    console.log('Token: ', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  async getNewsById(id: number): Promise<Observable<any>> {
    const url = `${this.baseUrl}/api/v1/news/${id}`;
    const token = await this.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any>(url, { headers });
  }
}
