
export interface QuizCreate {
    category: string;
    numQ: number;
    title: string
  }
  
  export interface QuizResponse {
    id: number,
    response: string
  }