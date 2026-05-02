import { describe, expect, it } from "vitest";
import { cn, formatDate, slugify, truncate } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges classes and ignores falsy values", () => {
      expect(cn("rounded", undefined, false && "hidden", "px-4")).toBe("rounded px-4");
    });

    it("resolves conflicting Tailwind classes", () => {
      expect(cn("px-2 py-1 text-sm", "px-4 text-base")).toBe("py-1 px-4 text-base");
    });
  });

  describe("formatDate", () => {
    it("formats Date instances correctly", () => {
      expect(formatDate(new Date(2024, 1, 29))).toBe("February 29, 2024");
    });

    it("supports custom locales", () => {
      expect(formatDate(new Date(2024, 0, 5), "en-GB")).toBe("5 January 2024");
    });

    it("formats date strings consistently", () => {
      expect(formatDate("2024-02-29T12:00:00")).toBe("February 29, 2024");
    });
  });

  describe("slugify", () => {
    it("creates slugs from mixed content", () => {
      expect(slugify(" Hello, World! 2026 ")).toBe("hello-world-2026");
    });

    it("removes accents and collapses separators", () => {
      expect(slugify("Crème brûlée & café__notes")).toBe("creme-brulee-cafe-notes");
    });
  });

  describe("truncate", () => {
    it("returns short strings unchanged", () => {
      expect(truncate("Short copy", 20)).toBe("Short copy");
    });

    it("truncates at the requested length", () => {
      expect(truncate("Personal website", 10)).toBe("Personal…");
    });

    it("handles very small max lengths", () => {
      expect(truncate("Hello", 1)).toBe("…");
    });
  });
});
