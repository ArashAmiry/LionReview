import { CodeFile } from "../components/CodePreview";

export interface CreateReviewPage {
    currentStep: number;
    questions: { questionType: string; question: string }[];
    reviewTitle: string;
    urls: string[];
    cachedFiles: Record<string, CodeFile>;
    triedToSubmit: boolean;
    invalidURLExists: boolean;
    formErrorMessage: string;
  };