import { render, screen } from "@testing-library/react";
import EmptySystems from "../EmptySystems";

describe("Empty Systems Component", () => {
  it("renders the component", () => {
    render(<EmptySystems />);

    const text = screen.getByText(/Create a new system/i);

    expect(text).toBeInTheDocument();
  });
});
