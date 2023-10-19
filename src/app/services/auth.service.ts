import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TokenResponse, TokenVerify } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://eneik-media.com';

  constructor(private http: HttpClient) {}

  public async getToken(
    username: string,
    password: string
  ): Promise<TokenResponse | null> {
    const url = `${this.baseUrl}/api/token/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username,
      password,
    };

    try {
      const response = await firstValueFrom(
        this.http.post<TokenResponse>(url, body, { headers })
      );
      return response;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  }

  public async verifyToken(
    token: string | null | undefined
  ): Promise<TokenVerify | null> {
    const url = `${this.baseUrl}/api/token/verify/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      token,
    };

    try {
      const response = await firstValueFrom(
        this.http.post<TokenVerify>(url, body, { headers })
      );
      return response;
    } catch (error) {
      console.error('Error verify token:', error);
      throw error;
    }
  }
}
