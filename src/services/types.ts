export type { ProductSize } from "@/services/worker/admin/product/size/types";

export type {
  Product,
  ProductExtras,
  ProductPrice,
} from "@/services/public/product/types";

export type { Branch } from "@/services/worker/admin/branch/types";

export type { Category } from "@/services/worker/admin/category/types";

export type { Tag } from "@/services/worker/admin/product/tag/types";

export interface AntdFile {
  name: string;
  originFileObj: File;
}
