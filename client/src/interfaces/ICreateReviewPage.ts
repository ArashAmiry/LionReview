import { CodeFile } from "../components/CodePreview";

export interface CreateReviewPage {
    currentStep: number;
    binaryQuestions: { questionType: string; question: string }[];
    textFieldQuestions: { questionType: string; question: string }[];
    rangeQuestions: { questionType: string; question: string }[];
    reviewTitle: string;
    urls: string[];
    cachedFiles: Record<string, CodeFile>;
    triedToSubmit: boolean;
    invalidURLExists: boolean;
    formErrorMessage: string;
  };