import { Base } from "@/types";
import { ProductSize, Category, Tag } from "@/services/types";

export interface Product extends Base {
  default_price: number;
  name: string;
  active: boolean;
  cover_path: string;
  ingredient: string;
  description: string;
  category?: Category;
  prices?: ProductPrice[];
  tags?: Tag[];
  extras?: ProductExtras[];
}

export interface ProductExtras extends Base {
  product_id: number;
  name: string;
  price: number;
}

export interface ProductPrice extends Base {
  product_id: number;
  is_default: boolean;
  size?: ProductSize;
  unit_price: number;
  vat: number;
  city_vat: number;
  total_price: number;
  xp: number;
}
