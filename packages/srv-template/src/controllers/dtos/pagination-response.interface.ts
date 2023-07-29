export interface PaginationMeta {
  limit: number;
  offset: number;
  total: number;
  // success: true;
}

export interface PaginationResponse<T = unknown> {
  data: T[];
  meta: PaginationMeta;
}
