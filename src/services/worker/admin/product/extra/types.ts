import { Base } from "@/types"

// Generated by https://quicktype.io

export interface ExtraAddInput {
    extras: ExtraInput[];
}

export interface ExtraInput {
    id:    number;
    name:  string;
    price: number;
}
