import { render } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("renders with content", () => {
    const { getByRole } = render(<Button>Find Me</Button>);

    const button = getByRole("button", { name: "Find Me" });

    expect(button).toBeInTheDocument();
  });

  it("calls onclick when clicked", () => {
    const func = jest.fn();
    const { getByRole } = render(<Button onClick={func}>Find Me</Button>);

    const button = getByRole("button", { name: "Find Me" });

    button.click();

    expect(func).toBeCalled();
  });

  it("does not call onclick when not clicked", () => {
    const func = jest.fn();
    const { getByRole } = render(<Button onClick={func}>Find Me</Button>);

    getByRole("button", { name: "Find Me" });

    expect(func).not.toBeCalled();
  });
});
