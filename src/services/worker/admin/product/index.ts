import http from "@/services";
import { Product } from "@/services/public/product/types";
import { PaginationResponse, SuccessResponse } from "@/types";
import { ProductFilter, ProductInput } from "./types";

namespace product {
  export const create = (data: ProductInput) => {
    return http.post<SuccessResponse>("/worker/admin/product/create", {
      body: data,
      hasAuth: true,
    });
  };
  export const remove = (id: number) => {
    return http.del<SuccessResponse>(`/worker/admin/product/delete/${id}`, {
      hasAuth: true,
    });
  };
  export const update = (id: number, data: ProductInput) => {
    return http.put<SuccessResponse>(`/worker/admin/product/update/${id}`, {
      body: data,
      hasAuth: true,
    });
  };
  export const get = (id: number) => {
    return http.get<Product>(`/worker/admin/product/get/${id}`, {
      hasAuth: true,
    });
  };
  export const list = (filter: ProductFilter) => {
    return http.post<PaginationResponse<Product>>(
      "/worker/admin/product/list",
      {
        body: filter,
        hasAuth: true,
      }
    );
  };
}

export default product;
