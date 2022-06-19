import { getByText, render } from "@testing-library/react";
import { generateTalkgroup } from "utils/mockData/generateTalkgroup";
import TalkgroupEdit from "../TalkgroupEdit";

describe("Talkgroup Edit Control", () => {
  it("renders a component", () => {
    const talkgroup = generateTalkgroup();
    const { getByTestId } = render(<TalkgroupEdit data={talkgroup} />);

    const cardTalkgroup = getByTestId("talkgroupDetails");
    const cardAgencies = getByTestId("agenciesDetails");

    expect(cardTalkgroup).toBeInTheDocument();
    expect(cardAgencies).toBeInTheDocument();
  });

  it("has the correct display items and values", () => {
    const talkgroup = generateTalkgroup();
    const { getByTestId } = render(<TalkgroupEdit data={talkgroup} />);

    const system = getByTestId("system");
    const decimalId = getByTestId("decimal_id");
    const alphaTag = getByTestId("alpha_tag");
    const description = getByTestId("description");
    const mode = getByTestId("mode");
    const encrypted = getByTestId("encrypted");

    const systemNameText = getByText(system, talkgroup.system.name);
    const decimalIdText = getByText(decimalId, talkgroup.decimal_id);
    const alphaTagText = getByText(alphaTag, talkgroup.alpha_tag as string);
    const descriptionText = getByText(
      description,
      talkgroup.description as string
    );
    const modeText = getByText(mode, talkgroup.mode);
    const encryptedText = getByText(
      encrypted,
      talkgroup.encrypted ? "Yes" : "No"
    );

    expect(systemNameText).toBeInTheDocument();
    expect(decimalIdText).toBeInTheDocument();
    expect(alphaTagText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(modeText).toBeInTheDocument();
    expect(encryptedText).toBeInTheDocument();
  });
});
