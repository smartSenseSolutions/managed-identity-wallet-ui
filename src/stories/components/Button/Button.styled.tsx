import styled from "styled-components";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonPropTypes } from "./Button.component";

export const StyledButton = styled(Button)<ButtonPropTypes & ButtonProps>`
  font-size: 1.2rem !important;

  .MuiButton-startIcon {
    margin-top: -0.2rem;
    margin-left: 0px;
  }

  &.MuiButtonBase-root {
    background-color: ${({ theme, buttonBgColor }) =>
      buttonBgColor ? buttonBgColor : theme.colors.primary70};
    color: ${({ theme, buttonTextColor }) =>
      buttonTextColor ? buttonTextColor : theme.colors.white};
    box-shadow: none;
    white-space: nowrap;
    text-transform: capitalize;

    &:hover {
      background-color: ${({ theme, buttonHoverBgColor }) =>
        buttonHoverBgColor ? buttonHoverBgColor : theme.colors.primary70};
      color: ${({ theme, buttonHoverTextColor }) =>
        buttonHoverTextColor ? buttonHoverTextColor : theme.colors.white};
      box-shadow: none;
    }
  }

  &.contained-disabled {
    background-color: ${({ theme, buttonBgColor }) =>
      buttonBgColor ? buttonBgColor : theme.colors.enabledInputGray};
    color: ${({ theme, buttonTextColor }) =>
      buttonTextColor ? buttonTextColor : theme.colors.black20};

    &.Mui-disabled {
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  &.MuiButton-outlined {
    color: ${({ theme, buttonTextColor }) =>
      buttonTextColor ? buttonTextColor : theme.colors.primary70};
    border: 1px solid
      ${({ theme, buttonTextColor }) =>
        buttonTextColor ? buttonTextColor : theme.colors.primary70};
    background-color: transparent;

    &:hover {
      background-color: ${({ theme, buttonHoverBgColor }) =>
        buttonHoverBgColor ? buttonHoverBgColor : theme.colors.primary70};
      color: ${({ theme, buttonHoverTextColor }) =>
        buttonHoverTextColor ? buttonHoverTextColor : theme.colors.white};

      .MuiButton-startIcon {
        svg {
          path {
            fill: ${({ theme, buttonHoverTextColor }) =>
              buttonHoverTextColor
                ? buttonHoverTextColor
                : theme.colors.white} !important;
          }
        }
      }
    }
  }

  &.outlined-disabled {
    &.Mui-disabled {
      border-color: ${({ theme }) => theme.colors.disabledInputGray};
      color: ${({ theme }) => theme.colors.disabledInputGray};
    }
  }

  &.MuiButton-sizeMini {
    font-size: 1.2rem;
    border-radius: 4px;
    height: 2.6rem;
    padding: 0 0.8rem;
  }

  &.MuiButton-text {
    color: ${({ theme, buttonTextColor }) =>
      buttonTextColor ? buttonTextColor : theme.colors.iconDarkGray} !important;
    background-color: transparent;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 1.4rem !important;
    line-height: 2rem;

    &:hover {
      color: ${({ theme, buttonHoverTextColor }) =>
        buttonHoverTextColor
          ? buttonHoverTextColor
          : theme.colors.iconDarkGray};
      background-color: transparent;
      text-decoration: none;
    }
  }

  &.MuiButton-sizeCompact {
    height: 3.4rem;
    font-size: 1.2rem;
    line-height: 2;
    padding: 0.5rem 1.1rem;
    border-radius: 4px;

    &.MuiButton-startIcon {
      margin-left: none;
    }
  }

  &.MuiButton-sizeSmall {
    padding: 1rem 2.2rem;
    border-radius: 10px;
    height: 3.9rem;
  }

  &.MuiButton-sizeRegular {
    padding: 1.2rem 2.4rem;
    border-radius: 10px;
    height: 4.3rem;
  }

  &.MuiButton-sizeMedium {
    padding: 1.4rem 2.8rem;
    border-radius: 12px;
    height: 4.7rem;
  }

  &.MuiButton-sizeLarge {
    padding: 1.6rem 3.2rem;
    border-radius: 12px;
    height: 5.2rem;
  }
`;

export const StyledLoadingController = styled(CircularProgress)``;
