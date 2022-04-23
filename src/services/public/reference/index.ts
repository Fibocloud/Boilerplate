import http from "@/services/index";
import { Branch, ProductSize, Tag } from "@/services/types";

namespace publicReference {
  export const branchListNp = () => {
    return http.get<Branch[]>(`/xxx/branch/list-np`, {});
  };

  export const sizeListNp = () => {
    return http.get<ProductSize[]>(`/xxx/size/list-np`, {});
  };

  export const tagListNp = () => {
    return http.get<Tag[]>(`/xxx/tag/list-np`, {});
  };
}

export default publicReference;
