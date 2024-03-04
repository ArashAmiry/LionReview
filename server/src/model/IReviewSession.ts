export interface IReviewSession {
    username: string;
    codePreviews: {
        formName: string,
        codeSegments: {
            filename: string,
            content: string
        }[],

        questions: {
            question: string,
            questionType: 'binary' | 'scale' | 'text',
            scaleRange?: number
        }[];
    }
}