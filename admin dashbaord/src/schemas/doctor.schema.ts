import { z } from "zod";

const scheduleSchema = z.object({
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const doctorSchema = z.object({
  name: z.string().min(3, "Doctor name is required"),

  gender: z.string().min(1, "Gender is required"),

  departmentSlug: z.string().min(1, "Department is required"),

  designation: z.string().min(1, "Designation is required"),

  qualifications: z
    .string()
    .min(3, "Qualifications are required"),

  experience: z
    .string()
    .min(1, "Experience is required"),

  roomNo: z.string().optional(),

  about: z.string().optional(),

  appointmentNote: z.string().optional(),

  displayOrder: z.coerce.number().min(
    1,
    "Display order is required",
  ),

  schedule: z.array(scheduleSchema).optional(),
});

export type DoctorFormData = z.infer<
  typeof doctorSchema
>;