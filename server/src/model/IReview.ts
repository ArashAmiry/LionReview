export interface IReview {
    name: string;
    createdBy: string;
    pages: [{
        formName: string,
        codeSegments: {
            filename: string,
            content: string
        }[],

        questions: {
            question: string,
            questionType: 'binary' | 'range' | 'text'
        }[];
    }]
}