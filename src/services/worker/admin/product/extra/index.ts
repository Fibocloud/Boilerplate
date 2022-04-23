import http from "@/services";
import { SuccessResponse } from "@/types";
import { ExtraAddInput } from "./types";

namespace productExtra {
  export const add = (product_id: number, data: ExtraAddInput) => {
    return http.post<SuccessResponse>(`/xxx/extra/add/${product_id}`, {
      body: data,
      hasAuth: true,
    });
  };

  export const remove = (id: number) => {
    return http.del<SuccessResponse>(`/xxx/extra/delete/${id}`, {
      hasAuth: true,
    });
  };
}

export default productExtra;
