import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngestionService {
  private apiUrl = 'http://localhost:5000/api/ingestion'; // Backend URL

  constructor(private http: HttpClient) {}

  getIngestionStatus(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/status`);
  }

  startIngestion(): Observable<any> {
    return this.http.post(`${this.apiUrl}/start`, {});
  }
}
