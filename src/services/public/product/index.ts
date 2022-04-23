import http from "@/services/index";
import { Category, Product, Tag } from "@/services/types";

namespace publicProduct {
  export const categoryListNp = (): Promise<Category[]> => {
    return http.get<Category[]>(`/xxx/category/list-np`, {});
  };

  export const productById = (id: number): Promise<Product> => {
    return http.get<Product>(`/xxx/get/${id}`, {});
  };

  export const productListNp = (): Promise<Product[]> => {
    return http.get<Product[]>(`/xxx/list-np`, {});
  };

  export const productTagListNp = (): Promise<Tag[]> => {
    return http.get<Tag[]>(`/xxx/tag/list-np`, {});
  };
}

export default publicProduct;
