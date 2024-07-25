import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question} from '../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {


  startUpdateQuestion: boolean = false;
  updateSelectedQuestion: any = {};
  
  questions: Question[] = [];
  title: string = 'Quiz App';
  newQuestion: Question = {
    id: 0,
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    difficultyLevel: '',
    category: ''
  };
  selectedCategory: string = '';


  formVisible: boolean = false;



    
  constructor( private questionService: QuestionService) {}

  ngOnInit() {
    this.getAllQuestions(); 
  }


  
  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (response) => {
        this.questions = response;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }


  selectedUpdateQuestion(question: any) {
    this.updateSelectedQuestion = question;
    this.toggleUpdateQuestion();
  }
  toggleUpdateQuestion() {
    
    this.startUpdateQuestion = !this.startUpdateQuestion;
  }
    
  
 toggleForm(formType: 'question' | 'quiz') {
  if (formType === 'question') {
    this.formVisible = !this.formVisible;
   
  } else {
 
    this.formVisible = false;
  }
}


  updateQuestion(question: any) {
    this.questionService.updateQuestion(question.id, question).subscribe(
      (response) => {
        console.log('Question updated:', response);
      } , 
      (error) => {
        console.log('Error updating question:', error);
        
      }
    )
    this.getAllQuestions();
    this.toggleUpdateQuestion();
    }

    deleteQuestion(id: number) {
      if (id) {
        this.questionService.deleteQuestion(id).subscribe(
          (response) => {
            console.log('Question deleted:', response);
          },
          (error) => {
            console.log('Error deleting question:', error);
            
          }
        );
      }
      this.getAllQuestions();
      this.toggleUpdateQuestion();
    }



  getQuestionsByCategory() {
    if (this.selectedCategory) {
      this.questionService.getQuestionsByCategory(this.selectedCategory).subscribe(
        (response) => {
          this.questions = response;
        },
        (error) => {
          console.error('Error fetching questions by category:', error);
        }
      );
    }
  }


  resetNewQuestion() {
    this.newQuestion = {
      id: 0,
      questionTitle: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      difficultyLevel: '',
      category: ''
    };
  }
}
