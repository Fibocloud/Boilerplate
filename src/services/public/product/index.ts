import http from "@/services/index";
import { Category, Product, Tag } from "@/services/types";

namespace publicProduct {
  export const categoryListNp = (): Promise<Category[]> => {
    return http.get<Category[]>(`/public/product/category/list-np`, {});
  };

  export const productById = (id: number): Promise<Product> => {
    return http.get<Product>(`/public/product/get/${id}`, {});
  };

  export const productListNp = (): Promise<Product[]> => {
    return http.get<Product[]>(`/public/product/list-np`, {});
  };

  export const productTagListNp = (): Promise<Tag[]> => {
    return http.get<Tag[]>(`/public/product/tag/list-np`, {});
  };
}

export default publicProduct;
