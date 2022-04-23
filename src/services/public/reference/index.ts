import http from "@/services/index";
import { Branch, ProductSize, Tag } from "@/services/types";

namespace publicReference {
  export const branchListNp = () => {
    return http.get<Branch[]>(`/public/reference/branch/list-np`, {});
  };

  export const sizeListNp = () => {
    return http.get<ProductSize[]>(`/public/reference/size/list-np`, {});
  };

  export const tagListNp = () => {
    return http.get<Tag[]>(`/public/reference/tag/list-np`, {});
  };
}

export default publicReference;
