import * as wizardHeaderUtils from "../wizardHeaderUtils";

describe("Wizard Header Utilities", () => {
  describe("Get Wizard Item State", () => {
    it("returns pending if not active or passed", () => {
      const results = wizardHeaderUtils.getWizardItemState(3, 1);
      expect(results).toBe("Pending");
    });
    it("returns active if current step", () => {
      const results = wizardHeaderUtils.getWizardItemState(3, 3);
      expect(results).toBe("Active");
    });
    it("returns finished if passed", () => {
      const results = wizardHeaderUtils.getWizardItemState(3, 6);
      expect(results).toBe("Finished");
    });
  });
});
