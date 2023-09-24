import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private baseUrl = 'http://localhost:8000'; // https://eneikapi.onrender.com

  constructor(private http: HttpClient) {}

  private async getToken(): Promise<string | null> {
    const url = `${this.baseUrl}/api/token/`;
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

  public async verifyToken(): Promise<string | null> {
    const token = await this.getToken();
    const url = `${this.baseUrl}/api/token/verify/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      token
    };

    try {
      const response = await firstValueFrom(this.http.post<any>(url, body, { headers }));
      return response;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
}

