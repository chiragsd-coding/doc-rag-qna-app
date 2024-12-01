import { Component } from '@angular/core';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
})
export class DocumentUploadComponent {
  selectedFile: File | null = null;

  constructor(private documentService: DocumentService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument(): void {
    if (this.selectedFile) {
      this.documentService.uploadDocument(this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully');
        },
        (error) => {
          console.error('File upload failed');
        }
      );
    }
  }
}
