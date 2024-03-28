import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";

type CreateReviewWizardButtonsProps = {
    pagesData: CreateReviewPage[],
    currentPageIndex: number,
    amountSteps: number,
    previousStep: () => void,
    nextStep: () => void
}

function CreateReviewWizardButtons({pagesData, currentPageIndex, amountSteps, previousStep, nextStep} : CreateReviewWizardButtonsProps) {
    const currentStep = pagesData[currentPageIndex].currentStep;

    return (
        <Col md={4} id="navButtons" className="my-4 d-flex justify-content-start px-0">
        {currentStep === 1 && (
          <Button size="lg" variant="danger" onClick={() => previousStep()}>Exit</Button>
        )}
        {currentStep !== 1 && (
          <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>
        )}
        {currentStep !== amountSteps && (
          <Button size="lg" variant="light" onClick={() => nextStep()}>Continue</Button>
        )}
      </Col>
    )
}

export default CreateReviewWizardButtons;