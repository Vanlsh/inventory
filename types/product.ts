import { ProductSubtype } from "@prisma/client";

export type TGuarantee = {
  start_date: Date;
  end_date: Date;
} | null;

export type TPrice = {
  value: number;
  is_default: boolean;
  symbol: string;
};

// export enum ProductSubtype {
//   PHONE = "phone",
//   COMPUTER = "computer",
//   TABLET = "tablet",
//   TV = "tv",
//   HEADPHONES = "headphones",
//   CONSOLE = "console",
//   CAMERA = "camera",
//   SMARTWATCH = "smartwatch",
// }

export type TProduct = {
  id: number;
  serial_number: number;
  is_new: boolean;
  photo: string | null;
  title: string;
  type: ProductSubtype;
  specification: string;
  date: Date;
  prices: TPrice[];
  guarantees: TGuarantee;
  order: { title: string };
};