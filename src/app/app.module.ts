// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
@NgModule({
  declarations: [AppComponent , QuizComponent , QuestionComponent ,  QuestionFormComponent , QuizFormComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

