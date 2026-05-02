import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("bg-foreground");
    expect(button.className).toContain("min-h-11");
  });

  it.each([
    ["primary", "bg-foreground"],
    ["secondary", "bg-card-muted"],
    ["ghost", "hover:bg-accent-soft"],
    ["outline", "hover:border-border-strong"],
  ] as const)("renders the %s variant", (variant, expectedClass) => {
    render(<Button variant={variant}>Variant</Button>);

    expect(screen.getByRole("button", { name: "Variant" }).className).toContain(expectedClass);
  });

  it.each([
    ["sm", "min-h-10"],
    ["md", "min-h-11"],
    ["lg", "min-h-12"],
  ] as const)("renders the %s size", (size, expectedClass) => {
    render(<Button size={size}>Sized</Button>);

    expect(screen.getByRole("button", { name: "Sized" }).className).toContain(expectedClass);
  });

  it("applies a custom className", () => {
    render(<Button className="qa-button">Custom</Button>);

    expect(screen.getByRole("button", { name: "Custom" })).toHaveClass("qa-button");
  });
});
