export interface IReview {
    _id: string;
    name: string;
    createdBy: string;
    status: string;
    randomize: Boolean;
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
    }[]
}