import * as React from "react";
import styled from "styled-components";
import { IconType } from "@miw/types/common";

type ColorType = {
  fill?: string;
};

const StyledSVG = styled.svg<ColorType>`
  fill: ${({ theme, fill }) => (fill ? fill : theme.colors.darkGreyBlue)};
`;

const CloseIcon = ({ height, width, fill, props }: IconType) => (
  <StyledSVG
    id=""
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 18"
    style={{
      enableBackground: "new 0 0 16 18",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M15.7 15.9c.1.2.2.4.2.6 0 .2-.1.4-.2.6-.1.2-.3.2-.6.2-.2 0-.4-.1-.6-.2L8 10.2l-6.5 6.9c-.1.2-.3.2-.6.2-.2 0-.4-.1-.6-.2-.1-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6L7 9 .6 2.1c-.2-.2-.3-.5-.2-.8C.4 1 .6.8.9.7c.3-.1.6 0 .8.2l6.5 6.9L14.7.9c.3-.3.8-.3 1.1 0 .3.3.3.9 0 1.2L9.2 9l6.5 6.9z"
      style={{
        fill: fill,
      }}
    />
  </StyledSVG>
);

CloseIcon.defaultProps = {
  height: 16.675,
  width: 15.621,
  fill: "#6c6c6c",
};

export default CloseIcon;
