import React from "react";
import PopPrediction from "./PopPrediction";
import { render } from "@testing-library/react";

describe("PopPrediction test", () => {
  it("renders correctly", () => {
    const { container } = render(<PopPrediction />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
