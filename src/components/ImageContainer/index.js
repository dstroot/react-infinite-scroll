import React from "react";
import { Image } from "../Image";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import "./image-container.css";

export const ImageContainer = ({
  src,
  thumb,
  height,
  width,
  alt,
  url,
  onIsVisible
}) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    }
  });

  const aspectRatio = (height / width) * 100;

  return (
    <a
      href={url}
      ref={ref}
      rel="noopener noreferrer"
      target="_BLANK"
      className="image-container"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && <Image src={src} thumb={thumb} alt={alt} />}
    </a>
  );
};
