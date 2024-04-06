export interface ITemplate {
    _id: string;
    category: string;
    name: string;
    info: string;
    questions: {
        questionType: string
        question: string
      }[]
}