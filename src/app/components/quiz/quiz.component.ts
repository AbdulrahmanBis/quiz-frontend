import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import {  QuizCreate, QuizResponse } from '../../models/quiz.model';
import { Question } from '../../models/question.model';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  
  constructor( private quizService: QuizService) {}

  ngOnInit() {
    this.getAllQuizzes(); 
  }

  startUpdateQuiz: boolean = false;
  responses: QuizResponse[] = [];
  quizTitle: string = '';
  result: number = 0;
  resultVisible: boolean = false;
  quiz_questions: Question[] = [];
  newQuiz: QuizCreate = {
    title: "",
    numQ: 0,
    category: ""
  }
  updateSelectedQuiz: QuizCreate = {
    title: "",
    numQ: 0,
    category: ""
  }
  formVisibleQuiz: boolean = false;
  quizId: number = 0;
  quizzes: any[] = []; 
  formVisible: boolean = false;
  selectedQuizId: string = '';
  quizStarted: boolean = false;


  toggleResult() {
    this.resultVisible = !this.resultVisible;
  }

  toggleUpdateQuiz() {
    this.startUpdateQuiz = !this.startUpdateQuiz;
 }
 
 toggleForm(formType: 'question' | 'quiz') {
  if (formType === 'question') {
    this.formVisible = !this.formVisible;
    this.formVisibleQuiz = false;
  } else {
    this.formVisibleQuiz = !this.formVisibleQuiz;
    this.formVisible = false;
  }
}
 
 getAllQuizzes() {
  this.quizService.getAllQuizzes().subscribe(
    (response) => {
      this.quizzes = response;
    },
    (error) => {
      console.error('Error fetching quizzes:', error);
    }
  );
}

startQuiz() {
  if (this.selectedQuizId) {
    this.quizService.getQuizQuestions(parseInt(this.selectedQuizId)).subscribe(
      (response) => {
        this.quizTitle = response.quizTitle;
        this.quiz_questions = response.questions;
        this.quizId = parseInt(this.selectedQuizId);
        this.responses = this.quiz_questions.map(q => ({ id: q.id, response: '' }));
        this.quizStarted = true;
        this.resultVisible = false;
      },
      (error) => {
        console.log('Error fetching questions:', error);
      }
    );
  }
}

selcetUpdateQuiz() {
  if (this.selectedQuizId) {
    this.quizService.getQuiz(parseInt(this.selectedQuizId)).subscribe(
      (response) => {
        this.updateSelectedQuiz.title = response.title;
        this.updateSelectedQuiz.numQ = response.questions.length;
        this.updateSelectedQuiz.category = response.category;
        this.toggleUpdateQuiz();
        if (this.resultVisible) {
          this.toggleResult();
        }
      },
      (error) => {
         console.log('Error fetching quiz:', error);
      } 
    );
  }
}
updateQuiz() {
  if (this.selectedQuizId) {
    this.quizService.updateQuiz(parseInt(this.selectedQuizId) , this.updateSelectedQuiz).subscribe(
      (response) => {
        console.log('Quiz updated:', response);
      },
      (error) => {
        console.log('Error updating quiz' , error);
        
      }
    );
  }
  this.getAllQuizzes();
  this.toggleUpdateQuiz();
}

deleteQuiz() {
  if (this.selectedQuizId) {
    this.quizService.deleteQuiz(parseInt(this.selectedQuizId)).subscribe(
      (response) => {
        console.log('Quiz deleted:', response);
      },
       (error) => {
        console.log('Error deleting quiz:', error);
       }
    );
  }
  this.getAllQuizzes();
  this.toggleUpdateQuiz();
}



submitQuiz() {
  this.quizService.submitQuiz(this.quizId, this.responses).subscribe(
    (response) => {
      console.log('Quiz submitted:', response);
      this.result = response;
      this.toggleResult();
      this.quizStarted = false;
    }, (error) => {
      console.log('Error submitting quiz:', error);
    }
  );
}

resetNewQuiz() {
  this.newQuiz = {
    title: "",
    numQ: 0,
    category: ""
  };
}

}
