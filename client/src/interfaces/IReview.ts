export interface IReview {
    _id: string;
    username: string;
    pages: {
        formName: string,
        codeSegments: {
            filename: string,
            content: string
        }[],

        questions: {
            _id: string;
            question: string,
            questionType: string
        }[];
    }[];
}
