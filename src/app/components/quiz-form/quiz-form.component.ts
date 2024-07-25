import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizCreate } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent {
  @Input() quiz: QuizCreate = {
    title: '',
    category: '',
    numQ: 0,
  };
  
  @Output() quizChange = new EventEmitter<QuizCreate>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();
  onSubmit() {
    this.submitForm.emit();
  }

  onQuizChange() {
    this.quizChange.emit(this.quiz);
  }

  OnCancel(){
    this.cancelForm.emit();
  }
}
