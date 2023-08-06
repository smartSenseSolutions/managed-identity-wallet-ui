import styled from "styled-components";
import { IconButton } from "@mui/material";

export const StyledHeaderContainer = styled.div`
  background: #1d1d1b;
`;

export const StyledHeader = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

export const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4rem;

  ul {
    display: flex;
    gap: 4rem;
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;

      &:hover {
        .MuiIconButton-root {
          opacity: 1;
        }
      }

      .MuiIconButton-root {
        display: flex;
        alingn-items: center;
        color: white;
        flex-flow: column;
        gap: 0.5rem;
        font-size: 1.2rem;
        line-height: 1.5rem;
        font-weight: 500;
        opacity: 0.8;
        position: relative;

        &.active {
          opacity: 1;
          &:after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0 auto;
            height: 2px;
            width: 28px;
            background: ${({ theme }) => theme.colors.redColor};
          }
        }
      }
    }
  }
`;

export const StyledHeaderLogo = styled.div`
  color: white;
`;

export const StyledHeaderRight = styled.div`
  display: flex;
  alingn-items: center;
  gap: 2.5rem;

  .MuiIconButton-root {
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

export const StyleUserProfile = styled.div`
  .userIcon {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 500;
    }
  }
`;
