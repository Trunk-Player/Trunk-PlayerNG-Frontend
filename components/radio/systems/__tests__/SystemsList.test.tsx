import { render, screen } from "@testing-library/react";
import SystemsList from "../SystemsList";

describe("Systems List Component", () => {
  it("renders with children", () => {
    render(<SystemsList>Find Me</SystemsList>);

    const childText = screen.getByText(/Find Me/i);

    expect(childText).toBeInTheDocument();
  });
});
