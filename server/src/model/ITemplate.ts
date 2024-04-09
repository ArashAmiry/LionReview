export interface ITemplate {
    category: string;
    name: string;
    info: string;
    questions:{
        questionType: 'binary' | 'range' | 'text'
        question: string
      }[]
}