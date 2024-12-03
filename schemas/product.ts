import { ProductSubtype } from "@prisma/client";
import { z } from "zod";

export type TProductSchema = z.infer<typeof productSchema>;

export const typeOptions = [
  "phone",
  "computer",
  "tablet",
  "tv",
  "headphones",
  "console",
  "camera",
  "smartwatch",
] as const;

export const getDefaultValue = (overwrite: Partial<TProductSchema> = {}) => ({
  title: overwrite.title || "",
  specification: overwrite.specification || "",
  description: overwrite.description || "",
  photo: overwrite.photo || "",
  guaranty_start: new Date(overwrite.guaranty_start || ""),
  guaranty_end: new Date(overwrite.guaranty_end || ""),
  serial_number: overwrite.serial_number || 0,
  is_new: overwrite.is_new || false,
  type: overwrite.type || "phone",
  price_usd: overwrite.price_usd || 0,
  price_uah: overwrite.price_uah || 0,
});

export const productSchema = z.object({
  serial_number: z.coerce
    .number({ invalid_type_error: "Should be number" })
    .min(1),
  description: z.string(),
  is_new: z.boolean(),
  photo: z.string(),
  title: z.string().min(3),
  type: z.enum(typeOptions),
  specification: z.string().min(3),
  guaranty_start: z.coerce.date(),
  guaranty_end: z.coerce.date(),
  price_usd: z.coerce.number({ invalid_type_error: "Should be number" }).min(1),
  price_uah: z.coerce.number({ invalid_type_error: "Should be number" }).min(1),
});
