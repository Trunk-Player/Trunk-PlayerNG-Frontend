import type { WizardHeaderItemState } from "@/types/components/WizardHeaderItem";

export const getWizardItemState = (
  itemStep: number,
  currentStep: number
): WizardHeaderItemState => {
  if (currentStep < itemStep) {
    return "Pending";
  } else if (currentStep === itemStep) {
    return "Active";
  } else {
    return "Finished";
  }
};
