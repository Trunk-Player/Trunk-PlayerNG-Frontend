import { render } from "@testing-library/react";
import LinkButton from "../LinkButton";

describe("Link Button", () => {
  it("renders with content", () => {
    const { getByRole } = render(
      <LinkButton href="https://www.google.com/">Find Me</LinkButton>
    );

    const button = getByRole("link", { name: "Find Me" });

    expect(button).toBeInTheDocument();
  });

  it("calls onclick when clicked", () => {
    const func = jest.fn();
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        onClick={func}
      >
        Find Me
      </LinkButton>
    );

    const button = getByRole("link", { name: "Find Me" });

    button.click();

    expect(func).toBeCalled();
  });

  it("does not call onclick when not clicked", () => {
    const func = jest.fn();
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        onClick={func}
      >
        Find Me
      </LinkButton>
    );

    getByRole("link", { name: "Find Me" });

    expect(func).not.toBeCalled();
  });

  it("adds classes passed", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        className="findmeclass"
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link.className).toContain("findmeclass");
  });

  it("adds default padding", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        defaultPadding
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link.className).toContain("px-3 py-2");
  });

  it("does not add default padding", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        defaultPadding={false}
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link.className).not.toContain("px-3 py-2");
  });

  it("adds default font size", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        defaultFontSize
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link.className).toContain("text-sm");
  });

  it("does not add default font size", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        defaultFontSize={false}
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link.className).not.toContain("text-sm");
  });

  it("renders a link with enable and href", () => {
    const { getByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        enabled
      >
        Find Me
      </LinkButton>
    );

    const link = getByRole("link", { name: "Find Me" });

    expect(link).toBeInTheDocument();
  });

  it("does not render a link with enable and no href", () => {
    const { queryByRole } = render(<LinkButton enabled>Find Me</LinkButton>);

    const link = queryByRole("link", { name: "Find Me" });

    expect(link).not.toBeInTheDocument();
  });

  it("does not render a link with disabled and href", () => {
    const { queryByRole } = render(
      <LinkButton
        href="https://www.google.com/"
        enabled={false}
      >
        Find Me
      </LinkButton>
    );

    const link = queryByRole("link", { name: "Find Me" });

    expect(link).not.toBeInTheDocument();
  });

  it("does not render a link with disabled and no href", () => {
    const { queryByRole } = render(
      <LinkButton enabled={false}>Find Me</LinkButton>
    );

    const link = queryByRole("link", { name: "Find Me" });

    expect(link).not.toBeInTheDocument();
  });
});
