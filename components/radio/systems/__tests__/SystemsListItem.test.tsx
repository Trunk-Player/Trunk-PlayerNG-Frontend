import { render, screen } from "@testing-library/react";
import SystemsListItem from "../SystemsListItem";

describe("Systems List Item Component", () => {
  it("renders with passed system data", () => {
    const name = "System Name";
    render(
      <SystemsListItem
        UUID="systemid"
        name={name}
      />
    );

    const nameText = screen.getByText(new RegExp(name, "i"));

    expect(nameText).toBeInTheDocument();
  });
});
