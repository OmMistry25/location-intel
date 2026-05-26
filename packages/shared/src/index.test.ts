import { describe, expect, it } from "vitest";
import { hello } from "./index";

describe("hello", () => {
  it("returns the shared greeting", () => {
    expect(hello()).toBe("Hello from location-intel shared.");
  });
});
