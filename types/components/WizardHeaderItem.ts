export type WizardHeaderItemState = "Pending" | "Active" | "Finished";

export interface WizardHeaderItem {
  name: string;
  state: WizardHeaderItemState;
}

export type WizardHeaderItems = WizardHeaderItem[];
