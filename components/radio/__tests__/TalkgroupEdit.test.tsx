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

    const systemName = getByText(system, talkgroup.system.name);

    expect(systemName).toBeInTheDocument();
  });
});
