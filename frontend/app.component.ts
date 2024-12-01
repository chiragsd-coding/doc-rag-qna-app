import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  documentFile: File | null = null;
  query: string = '';
  answer: string = '';

  constructor(private appService: AppService) {}

  onFileSelected(event: any): void {
    this.documentFile = event.target.files[0];
  }

  uploadDocument(): void {
    if (this.documentFile) {
      const formData = new FormData();
      formData.append('file', this.documentFile);
      this.appService.uploadDocument(formData).subscribe(response => {
        console.log('Document uploaded successfully', response);
      });
    }
  }

  queryDocument(): void {
    this.appService.queryDocument(this.query).subscribe(response => {
      this.answer = response.answer;
    });
  }
}
