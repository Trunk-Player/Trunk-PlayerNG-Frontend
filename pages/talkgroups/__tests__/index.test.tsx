import { render, screen } from "@testing-library/react";
import TalkgroupsListPage from "../index";

describe("Talkgroups List Page", () => {
  it("renders a table", () => {
    render(<TalkgroupsListPage />);

    const table = screen.findByRole("table");

    expect(table).toBeInTheDocument();
  });
});
