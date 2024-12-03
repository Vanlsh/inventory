import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(8),
});

export type TAuthSchema = z.infer<typeof authSchema>;
