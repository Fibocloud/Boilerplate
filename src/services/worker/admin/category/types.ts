import { Base } from "@/types";
import { AntdFile, Branch, Product } from "@/services/types";
export interface Category extends Base {
  name: string;
  image_path: string;
  products: Product[] | null;
  branchs: Branch[] | null;
  is_default: boolean;
  active: boolean;
}

export interface CategoryInput {
  image_path: string;
  is_default: boolean;
  name: string;
  image: AntdFile[];
  active: boolean;
}
