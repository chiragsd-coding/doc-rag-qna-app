import { Component } from '@angular/core';
import { QnaService } from '../qna.service';

@Component({
  selector: 'app-qa-input',
  templateUrl: './qa-input.component.html',
  styleUrls: ['./qa-input.component.css'],
})
export class QaInputComponent {
  question: string = '';
  answer: string = '';

  constructor(private qnaService: QnaService) {}

  askQuestion(): void {
    this.qnaService.askQuestion(this.question).subscribe(
      (response) => {
        this.answer = response.answer;
      },
      (error) => {
        console.error('Error asking question');
      }
    );
  }
}
