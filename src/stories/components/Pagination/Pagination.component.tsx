import * as React from "react";
import { RECORDS_PER_PAGE } from "../../../utils/constant";
import { StyledContainer, StyledPagination } from "./Pagination.styled";

interface PaginationProps {
  // rowsPerPage: number;
  rowCount: number;
  currentPage: number;
  // direction?: Direction;
  // paginationRowsPerPageOptions?: number[];
  // paginationIconLastPage?: React.ReactNode;
  // paginationIconFirstPage?: React.ReactNode;
  // paginationIconNext?: React.ReactNode;
  // paginationIconPrevious?: React.ReactNode;
  // paginationComponentOptions?: PaginationOptions;
  onChangePage: (page: number) => void;
  // onChangeRowsPerPage: (numRows: number, currentPage: number) => void;
}

function PaginationComponent({
  rowCount,
  currentPage,
  onChangePage,
}: PaginationProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangePage(value);
  };

  return (
    <StyledContainer>
      <StyledPagination
        count={Math.ceil(rowCount / RECORDS_PER_PAGE)}
        onChange={handleChange}
        shape="rounded"
        // renderItem={(item) => <PaginationItem slots={{ previous: Prev, next: Next }} {...item} />}
        variant={"text"}
        page={currentPage}
      />
    </StyledContainer>
  );
}

export default PaginationComponent;
