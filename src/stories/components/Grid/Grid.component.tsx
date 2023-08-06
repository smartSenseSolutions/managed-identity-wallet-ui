import React from "react";
import {
  StyledGridContainer,
  StyledDescription,
  StyledGridItem,
} from "./Grid.styled";

type GridProp = {
  col?: number;
  children: React.ReactNode;
};

type GridItemProp = {
  description: string;
  children: React.ReactNode;
};

export const GridItem = ({
  description,
  children,
}: GridItemProp): JSX.Element => {
  return (
    <StyledGridItem>
      {children}
      <StyledDescription>{description}</StyledDescription>
    </StyledGridItem>
  );
};

function Grid({ col, children }: GridProp): JSX.Element {
  return <StyledGridContainer columns={col}>{children}</StyledGridContainer>;
}

export default Grid;
