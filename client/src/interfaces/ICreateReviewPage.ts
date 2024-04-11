import { CodeFile } from "../components/CodePreview";

export interface CreateReviewPage {
    currentStep: number;
    questions: { questionType: string; question: string }[];
    reviewTitle: string;
    files: CodeFile[];
    cachedFiles: Record<string, CodeFile>;
    triedToSubmit: boolean;
    invalidURLExists: boolean;
    formErrorMessage: string;
  };