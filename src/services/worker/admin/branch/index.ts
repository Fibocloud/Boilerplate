import http from "@/services";
import { Branch } from "@/services/types";
import { BranchLocation, BranchInput } from "./types";
import {
  SuccessResponse,
  PaginationResponse,
  PaginationRequest,
} from "@/types";

namespace branch {
  export const create = (data: BranchInput) => {
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
  export const get = (id: number) => {
    return http.get<Branch>(`/xxx/get/${id}`, {
      hasAuth: true,
    });
  };
  export const list = (params: PaginationRequest) => {
    return http.post<PaginationResponse<Branch>>(`/xxx/list`, {
      hasAuth: true,
      body: params,
    });
  };
  export const update = (id: number, data: BranchInput) => {
    return http.put<SuccessResponse>(`/xxx/update/${id}`, {
      body: data,
      hasAuth: true,
    });
  };
  export const addLocation = (branchId: number, data: BranchLocation) => {
    return http.post<SuccessResponse>(`/xxx/${branchId}`, {
      body: data,
      hasAuth: true,
    });
  };
  export const updateLocation = (branchId: number, data: BranchLocation) => {
    return http.put<SuccessResponse>(`/xxx/${branchId}`, {
      body: data,
      hasAuth: true,
    });
  };
}
export default branch;
