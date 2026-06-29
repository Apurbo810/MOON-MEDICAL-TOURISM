import { z } from "zod";

export const departmentSchema = z.object({
  title: z
    .string()
    .min(3, "Department name is required"),

  shortDescription: z
    .string()
    .min(
      10,
      "Description must be at least 10 characters"
    )
    .max(
      10000,
      "Description cannot exceed 150 characters"
    ),
});

export type DepartmentFormData = z.infer<
  typeof departmentSchema
>;