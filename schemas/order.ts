import { z } from "zod";

export type TOrderSchema = z.infer<typeof orderSchema>;

export const getDefaultValue = (overwrite: Partial<TOrderSchema> = {}) => ({
  title: overwrite.title || "",
  description: overwrite.description || "",
});

export const orderSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
});
