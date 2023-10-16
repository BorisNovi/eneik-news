import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { singleStory } from '../interfaces/stories-interface';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private baseUrl = 'https://eneik-media.com';

  constructor(private http: HttpClient) {}

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
}
