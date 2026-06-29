import {
  Control,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { useEffect } from "react";

import { DoctorFormData } from "../../schemas/doctor.schema";

interface Props {
  register: UseFormRegister<DoctorFormData>;
  control: Control<DoctorFormData>;
}

export default function DoctorSchedule({
  register,
  control,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  // Debug logging
  useEffect(() => {
    console.log("🎯 DoctorSchedule - Fields updated:", fields);
    fields.forEach((field, index) => {
      console.log(`  Field ${index}:`, field);
    });
  }, [fields]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Doctor Schedule
        </h3>

        <button
          type="button"
          onClick={() =>
            append({
              day: "Sunday",
              startTime: "",
              endTime: "",
            })
          }
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          + Add Schedule
        </button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
          No schedule added yet.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 p-4 md:grid-cols-4 dark:border-gray-700"
          >
            {/* Day */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Day
              </label>

              <select
                {...register(`schedule.${index}.day`)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
              >
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Value: {field.day}
              </p>
            </div>

            {/* Start Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Start Time
              </label>

              <input
                type="time"
                {...register(
                  `schedule.${index}.startTime` as const,
                )}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
              />
              <p className="mt-1 text-xs text-gray-500">
                Value: {field.startTime || "empty"}
              </p>
            </div>

            {/* End Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                End Time
              </label>

              <input
                type="time"
                {...register(
                  `schedule.${index}.endTime` as const,
                )}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
              />
              <p className="mt-1 text-xs text-gray-500">
                Value: {field.endTime || "empty"}
              </p>
            </div>

            {/* Remove Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}