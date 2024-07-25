
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/question';

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allQuestions`);
  }

  getQuestionsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${category}`);
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, question);
  }

  updateQuestion(id: number , quetion: any ): Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${id}`, quetion)
  }

  deleteQuestion(id : number ): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }
}

