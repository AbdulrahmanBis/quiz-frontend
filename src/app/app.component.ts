import { Component } from '@angular/core';
import { Question } from './models/question.model'; // Create a model for Question
import { QuizCreate } from './models/quiz.model'; // Create a model for Quiz
import { QuestionService } from './services/question.service';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeTab: string = 'quiz';
  formVisible: boolean = false;
  formVisibleQuiz: boolean = false;
  newQuestion: Question = {
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
  newQuiz: QuizCreate = {
    category: '',
    numQ: 0,
    title: '',
  };
  
  constructor(private questionService: QuestionService, private quizService: QuizService) {}


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleForm(formType: string) {
    if (formType === 'question') {
      this.formVisible = !this.formVisible;
      this.formVisibleQuiz = false;
    } else if (formType === 'quiz') {
      this.formVisibleQuiz = !this.formVisibleQuiz;
      this.formVisible = false;
    }
  }

  addQuestion() {
    this.questionService.addQuestion(this.newQuestion).subscribe(
      (response) => {
        console.log('Question added:', response);
        // this.getAllQuestions();
        // this.resetNewQuestion();
         this.toggleForm('question');
      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }

  addQuiz() {
    this.quizService.createQuiz(this.newQuiz.category, this.newQuiz.numQ, this.newQuiz.title).subscribe(
      (response) => {
        console.log('Quiz created:', response);
        // this.getAllQuizzes();
        // this.resetNewQuiz();
        this.toggleForm('quiz');
      }, (error) => {
        console.log('Error creating quiz:', error);
      }
    );
  }
}
