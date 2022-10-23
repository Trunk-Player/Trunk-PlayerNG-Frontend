import { useEffect, useMemo, useState } from "react";

export interface WizardStepsProps {
  maxSteps: number;
  startingStep?: number;
  onStepChanged?(currentStep: number): void;
  onFirstStep?(): void;
  onFinalStep?(): void;
}

export const useWizardSteps = ({
  maxSteps,
  startingStep,
  onStepChanged,
  onFirstStep,
  onFinalStep,
}: WizardStepsProps) => {
  const [step, setStep] = useState<number>(startingStep || 1);
  const canGoNext = useMemo(() => step < maxSteps, [step, maxSteps]);
  const canGoPrevious = useMemo(() => step > 1, [step]);

  const alertOnSteps = (currentStep: number) => {
    if (onStepChanged) {
      onStepChanged(currentStep);
    }

    if (currentStep === 1 && onFirstStep) {
      onFirstStep();
    }

    if (currentStep === maxSteps && onFinalStep) {
      onFinalStep();
    }
  };

  const nextStep = () => {
    if (canGoNext) {
      setStep(step + 1);
      alertOnSteps(step + 1);
    }
  };

  const previousStep = () => {
    if (canGoPrevious) {
      setStep(step - 1);
      alertOnSteps(step - 1);
    }
  };

  useEffect(() => {
    if (step === 1 && onFirstStep) {
      onFirstStep();
    }
    if (step === maxSteps && onFinalStep) {
      onFinalStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSteps, startingStep]);

  return {
    currentStep: step,
    nextStep,
    previousStep,
    canGoNext,
    canGoPrevious,
  };
};
