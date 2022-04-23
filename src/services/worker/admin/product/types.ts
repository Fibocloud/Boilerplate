import { AntdFile } from "@/services/types";
import { PaginationRequest } from "@/types";

export interface ProductInput {
  category_id: number;
  cover_path: string;
  description: string;
  ingredient: string;
  active: boolean;
  name: string;
  prices: PriceInput[];
  tags: number[];
  image: AntdFile[];
}

export interface PriceInput {
  id: number;
  is_default: boolean;
  size_id: number;
  total_price: number;
  xp: number;
}

export interface ProductFilter extends PaginationRequest {
  category_id?: number;
  name?: string;
  active?: string;
  tag?: number[];
  created_at?: string[];
}
