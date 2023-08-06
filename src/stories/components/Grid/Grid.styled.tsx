import styled from "styled-components";

type StyledGridContainerProps = {
  columns: number;
};

export const StyledGridContainer = styled.div<StyledGridContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns }) => (columns ? `${columns},1fr` : "3,1fr")}
  );
  gap: 20px;
  margin: 20px;
`;
export const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
export const StyledGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
