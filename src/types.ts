import { Product } from "./services/types";

export interface StringInterface {
  [x: string]: string;
}

export interface AnyInterface {
  [x: string]: any;
}

export type Optional<T> = T | undefined | null;

export interface Base {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface DeleteConfirm {
  confirm: string;
}

export interface BaseResponse<T> {
  message: string;
  body: T;
}

export interface PaginationResponse<T> {
  total: number;
  items: Array<T>;
  day?: number;
  week?: number;
  month?: number;
}

export interface SearchResponse<T> {
  has_next: boolean;
  items: Array<T>;
  day?: number;
  week?: number;
  month?: number;
}

export interface PaginationRequest {
  limit: number;
  page: number;
  sorter: Optional<Object>;
}

export type SuccessResponse = { success: boolean };
