import * as React from "react";
import { SVGProps } from "react";

const ThreeDotIcon = ({
  height,
  width,
  fill,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    height={height}
    viewBox="0 0 32 32"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 26c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zM13 6c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z" />
  </svg>
);

ThreeDotIcon.defaultProps = {
  width: 18,
  height: 18,
};

export default ThreeDotIcon;
