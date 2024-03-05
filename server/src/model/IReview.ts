export interface IReview {
    username: string;
    review: [{
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