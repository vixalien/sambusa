import { describe, expect, test } from "vitest";

import { prettyDate, prettyNumber, prettyString } from "./format";

describe("prettyNumber", () => {
  test("handles normal numbers", () => {
    expect(prettyNumber(10000000)).toEqual("10,000,000");
  });

  test("handles fractional numbers", () => {
    expect(prettyNumber(0.0055)).toEqual("0.006");
  });
});

describe("prettyString", () => {
  test("formats normal numbers", () => {
    expect(prettyString(10000000)).toEqual("10,000,000");
  });

  test("leaves other types", () => {
    expect(prettyString(null)).toEqual(null);
  });
});

test("prettyDate", () => {
  expect(prettyDate(new Date("01-01-2024"))).toEqual("01/01");
});
