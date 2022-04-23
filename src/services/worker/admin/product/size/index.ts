import http from "@/services";
import { PaginationResponse, SuccessResponse } from "@/types";
import { ProductSize, ProductSizeFilter, ProductSizeInput } from "./types";

namespace productSize {
  export const create = (data: ProductSizeInput) => {
    return http.post<SuccessResponse>("/xxx/size/create", {
      body: data,
      hasAuth: true,
    });
  };

  export const remove = (id: number) => {
    return http.del<SuccessResponse>(`/xxx/size/delete/${id}`, {
      hasAuth: true,
    });
  };

  export const list = (pagination: ProductSizeFilter) => {
    return http.post<PaginationResponse<ProductSize>>(`/xxx/size/list`, {
      body: pagination,
      hasAuth: true,
    });
  };

  export const update = (id: number, data: ProductSizeInput) => {
    return http.put<SuccessResponse>(`/xxx/size/update/${id}`, {
      body: data,
      hasAuth: true,
    });
  };
}

export default productSize;
