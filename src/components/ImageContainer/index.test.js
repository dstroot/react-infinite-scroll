import React from "react";
import { render } from "@testing-library/react";

// component to test
import { ImageContainer } from ".";
import data from "./__test__/data.json";

describe("ImageContainer", () => {
  const windowIntersectionObserver = window.IntersectionObserver;
  const visibleMock = jest.fn();

  beforeAll(() => {
    const mockEntry = { isIntersecting: true };

    window.IntersectionObserver = jest.fn(function () {
      this.observe = () => {};
      this.unobserve = jest.fn();
    });
  });

  afterAll(() => {
    window.IntersectionObserver = windowIntersectionObserver;
  });

  it("renders", () => {
    // arrange
    const { asFragment } = render(
      <ImageContainer
        src={data.urls.regular}
        thumb={data.urls.thumb}
        height={data.height}
        width={data.width}
        alt={data.alt_description}
        url={data.links.html}
        onIsVisible={visibleMock}
      />
    );

    // act

    // assert
    expect(asFragment()).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
    expect(visibleMock.mock.calls.length).toBe(0);
  });
});

// Testing Intersection Observers
// https://gist.github.com/ianmcnally/4b68c56900a20840b6ca840e2403771c
