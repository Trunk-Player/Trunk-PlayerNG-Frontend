import React from "react";
import { render, screen } from "@testing-library/react";
import CreateNewScanner from "components/ui/CreateNewScanner";

test("renders create a new scanner text", () => {
  render(<CreateNewScanner />);
  const linkElement = screen.getByText(/Create a new scanner/i);
  expect(linkElement).toBeInTheDocument();
});
