import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>Status</Badge>);

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it.each([
    ["default", "bg-card-muted"],
    ["outline", "border-border"],
    ["accent", "bg-accent-soft"],
  ] as const)("renders the %s variant", (variant, expectedClass) => {
    render(<Badge variant={variant}>Variant</Badge>);

    expect(screen.getByText("Variant").className).toContain(expectedClass);
  });
});
