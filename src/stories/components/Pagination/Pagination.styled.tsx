import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

export const StyledContainer = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 3rem;
  }
`;
export const StyledPagination = styled(Pagination)`
  .MuiPagination-ul {
    @media (max-width: 767px) {
      justify-content: flex-start;
    }

    .MuiPaginationItem-root {
      font-size: 1.4rem;
      line-height: 2rem;
      background-color: transparent !important;
      border-radius: 4px;
    }

    .Mui-selected {
      background-color: transparent !important;
      border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 0;
      color: ${({ theme }) => theme.colors.secondary};
    }
    .MuiPaginationItem-icon {
      margin: 0px -8px;
      font-size: 2.25rem;
      background: ${({ theme }) => theme.colors.white};
      border-radius: 0;
    }
  }
`;
