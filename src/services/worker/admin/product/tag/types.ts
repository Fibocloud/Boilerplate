import { Base, Optional, PaginationRequest } from "@/types";
import { Product } from "@/services/types";

export interface Tag extends Base {
  name: string;
  color: string;
  products: Optional<Product[]>;
}

export interface TagInput {
  color: string;
  name: string;
}

export interface TagFilter extends PaginationRequest {
  name?: string;
}
