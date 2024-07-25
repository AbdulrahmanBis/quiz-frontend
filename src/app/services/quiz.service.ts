import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  privateUrl = "http://localhost:8080/quiz"
  constructor( private http: HttpClient) { }

  createQuiz(category: string, numQ: number , title: string ): Observable<any> {
    //force numQ to be an integer
    numQ = Math.floor(numQ)
    return this.http.post(`${this.privateUrl}/create`, {category, numQ, title})
  }

  getQuiz(id: number): Observable<any> {
    return this.http.get(`${this.privateUrl}/getQuiz/${id}`)
  }
  getAllQuizzes(): Observable<any>{
    return this.http.get(`${this.privateUrl}/all`)
  }


  getQuizQuestions(id: number ): Observable<any>{
    return this.http.get(`${this.privateUrl}/get/${id}`)
  }

  updateQuiz(id: number , updateQuiz : any ): Observable<any>{
      
       updateQuiz.numQ = Math.floor(updateQuiz.numQ)
    return this.http.put(`${this.privateUrl}/update/${id}`, updateQuiz) 
  }

  deleteQuiz(id : number): Observable<any>{
    return this.http.delete(`${this.privateUrl}/delete/${id}`)
  }

  submitQuiz(id: number , responses: any ): Observable<any>{
    return this.http.post(`${this.privateUrl}/submit/${id}` , responses)
  }



}
