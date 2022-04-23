import { Base, Optional } from "@/types";
import { Category } from "@/services/types";

export interface Branch extends Base {
  name: string;
  location: Optional<Location>;
  categories: Optional<Category[]>;
  feedbacks: Optional<FeedBack[]>;
}

export interface FeedBack extends Base {
  description: string;
  food_rate: number;
  menu_rate: number;
  service_rate: number;
  promote_us: number;
  is_anonymous: boolean;
  branch: Optional<Branch>;
  service_date: string;
  phone: string;
}

export interface BranchInput {
  name: string;
  num: number;
}
export interface BranchLocation extends Base {
  aimag_hot_id: number;
  sum_duureg_id: number;
  bag_horoo_id: number;
  address_desc: string | "";
  contact_phone: string | "";
  latitude: number | 0;
  longitude: number | 0;
}
