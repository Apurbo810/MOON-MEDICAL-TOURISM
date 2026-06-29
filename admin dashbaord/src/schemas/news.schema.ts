// src/schemas/news.schema.ts

import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required"),

  description: z
    .string()
    .min(
      20,
      "Description must be at least 20 characters"
    ),
});

export type NewsFormData = z.infer<
  typeof newsSchema
>;