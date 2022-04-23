import http from "@/services";
import { PaginationResponse, SuccessResponse } from "@/types";
import { Tag, TagFilter, TagInput } from "./types";

namespace tag {
  export const create = (data: TagInput) => {
    return http.post<SuccessResponse>("/xxx/tag/create", {
      body: data,
      hasAuth: true,
    });
  };

  export const remove = (id: number) => {
    return http.del<SuccessResponse>(`/xxx/tag/delete/${id}`, {
      hasAuth: true,
    });
  };

  export const update = (id: number, data: TagInput) => {
    return http.put<SuccessResponse>(`/xxx/tag/update/${id}`, {
      body: data,
      hasAuth: true,
    });
  };

  export const list = (pagination: TagFilter) => {
    return http.post<PaginationResponse<Tag>>(`/xxx/tag/list`, {
      body: pagination,
      hasAuth: true,
    });
  };
}

export default tag;
