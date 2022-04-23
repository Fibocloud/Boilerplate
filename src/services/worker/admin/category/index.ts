import http from "@/services";
import {
  PaginationRequest,
  PaginationResponse,
  SuccessResponse,
} from "@/types";
import { Category, CategoryInput } from "./types";

namespace category {
  export const create = (data: CategoryInput) => {
    return http.post<SuccessResponse>("/xxx/create", {
      body: data,
      hasAuth: true,
    });
  };

  export const remove = (id: number) => {
    return http.del<SuccessResponse>(`/xxx/delete/${id}`, {
      hasAuth: true,
    });
  };

  export const update = (id: number, data: CategoryInput) => {
    return http.put<SuccessResponse>(`/xxx/update/${id}`, {
      body: data,
      hasAuth: true,
    });
  };

  export const list = (pagination: PaginationRequest) => {
    return http.post<PaginationResponse<Category>>("/xxx/list", {
      body: pagination,
      hasAuth: true,
    });
  };
}

export default category;
