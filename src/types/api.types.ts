export interface ApiResponse<T> {
    data: T;
    status: number;
    error?: string;
  }
