export type PagerType = {
  filteredRecords?: number;
  pageNumber?: number;
  recordsPerPage: number;
  sortBy: string;
  sortOrder: string;
  totalRecords: number;
};

export type ApiResponse<T> = {
  message: string;
  payload: T;
  show: boolean;
  status: number;
  pager?: PagerType;
};

export type IconType = {
  width: number;
  height: number;
  fill?: string;
  opacity?: number | string;
  props?: any;
};

export type CatchErrorType = ApiResponse<null>;
