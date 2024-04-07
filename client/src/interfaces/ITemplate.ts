export interface ITemplate {
    _id: string;
    name: string;
    info: string;
    questions: {
        questionType: string
        question: string
      }[]
}