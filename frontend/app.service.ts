import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:3000'; // NestJS API URL

  constructor(private http: HttpClient) {}

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/documents`, formData);
  }

  queryDocument(query: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/query`, { query });
  }
}
