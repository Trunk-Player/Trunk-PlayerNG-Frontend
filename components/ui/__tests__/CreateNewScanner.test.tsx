import { render, screen } from "@testing-library/react";
import CreateNewScanner from "components/ui/CreateNewScanner";

describe("Create New Scanner Component", () => {
  it("render's a button", () => {
    render(<CreateNewScanner />);

    const button = screen.getByRole("button", {
      name: /Create a New Scanner/i,
    });

    expect(button).toBeInTheDocument();
  });
});
