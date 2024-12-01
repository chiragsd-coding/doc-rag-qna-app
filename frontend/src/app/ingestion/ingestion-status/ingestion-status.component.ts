import { Component, OnInit } from '@angular/core';
import { IngestionService } from '../ingestion.service';

@Component({
  selector: 'app-ingestion-status',
  templateUrl: './ingestion-status.component.html',
  styleUrls: ['./ingestion-status.component.css'],
})
export class IngestionStatusComponent implements OnInit {
  ingestionStatus: string = '';

  constructor(private ingestionService: IngestionService) {}

  ngOnInit(): void {
    this.ingestionService.getIngestionStatus().subscribe(
      (status) => {
        this.ingestionStatus = status;
      },
      (error) => {
        console.error('Error fetching ingestion status');
      }
    );
  }
}
