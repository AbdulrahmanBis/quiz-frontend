import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent {
  @Input() question: Question = {
    id: 0,
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    difficultyLevel: '',
    category: '',
  };
  
  @Output() questionChange = new EventEmitter<Question>();
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();
  onSubmit() {
    this.submitForm.emit();
  }

  onQuestionChange() {
    this.questionChange.emit(this.question);
  }
  OnCancel(){
    this.cancelForm.emit();
  }
}
