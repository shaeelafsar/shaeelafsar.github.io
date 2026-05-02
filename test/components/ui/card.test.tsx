import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <CardContent>
          <h2>Card title</h2>
          <p>Card body</p>
        </CardContent>
        <CardFooter>
          <span>Footer content</span>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Card title" })).toBeInTheDocument();
    expect(screen.getByText("Card body")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies a custom className", () => {
    render(<Card className="qa-card">Body</Card>);

    expect(screen.getByText("Body").closest("article")).toHaveClass("qa-card");
  });
});
