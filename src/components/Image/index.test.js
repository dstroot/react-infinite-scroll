// After importing the necessary packages, we can write a test which calls
// the render function provided by React Testing Library, which returns an
// object that we can extract asFragment from. Using this we can use the
// built-in functionality from Jest to perform a snapshot test.

import React from "react";
import { render } from "@testing-library/react";

// component to test
import { Image } from ".";
import data from "./__test__/data.json";

describe("Image", () => {
  it("renders", () => {
    // arrange
    const { asFragment } = render(
      <Image
        src={data.urls.regular}
        thumb={data.urls.thumb}
        alt={data.alt_description}
      />
    );

    // act

    // assert
    expect(asFragment()).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
