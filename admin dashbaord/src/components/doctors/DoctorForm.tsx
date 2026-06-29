import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";
import {
  doctorSchema,
  DoctorFormData,
} from "../../schemas/doctor.schema";
import DoctorSchedule from "./DoctorSchedule";
import axiosInstance from "../../services/axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
export default function DoctorForm() {
  interface Department {
    _id: string;
    title: string;
    slug: string;
  }
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [oldImagePublicId, setOldImagePublicId] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema) as Resolver<DoctorFormData>,
    defaultValues: {
      roomNo: "",
      about: "",
      appointmentNote: "",
      schedule: [],
    },
  });
useEffect(() => {
  if (!id) return;

  const fetchDoctor = async () => {
    try {
      const res = await axiosInstance.get(
        `/doctors/${id}`
      );

      const doctor = res.data;

      // Debug logging
      console.log("📋 Fetched Doctor Data:", doctor);
      console.log("📅 Raw Schedule:", doctor.schedule);
      console.log("📅 Schedule Type:", Array.isArray(doctor.schedule) ? "Array" : typeof doctor.schedule);
      
      if (doctor.schedule && Array.isArray(doctor.schedule)) {
        console.log("📅 First Schedule Item:", doctor.schedule[0]);
        console.log("📅 First Schedule Keys:", Object.keys(doctor.schedule[0] || {}));
      }

      // Transform schedule to ensure it has startTime and endTime
      const transformedSchedule = doctor.schedule?.map((item: any) => {
        console.log(`🔄 Transforming schedule item:`, item);
        const convertTo24Hour = (time: string) => {
        if (!time) return "";

        const [timePart, modifier] = time.split(" ");

        let [hours, minutes] = timePart.split(":");

        if (modifier === "PM" && hours !== "12") {
          hours = String(Number(hours) + 12);
        }

        if (modifier === "AM" && hours === "12") {
          hours = "00";
        }

        return `${hours.padStart(2, "0")}:${minutes}`;
      };
        // Handle old format with single "time" field
        if (item.time && !item.startTime && !item.endTime) {
          const parts = item.time.split("-");

          return {
            day: item.day,
            startTime: convertTo24Hour(parts[0]?.trim() || ""),
            endTime: convertTo24Hour(parts[1]?.trim() || ""),
          };
        }
        // Handle new format with startTime and endTime
        return {
          day: item.day || "",
          startTime: item.startTime || "",
          endTime: item.endTime || "",
        };
      }) || [];

      console.log("✅ Transformed Schedule:", transformedSchedule);

      reset({
        name: doctor.name,
        gender: doctor.gender,
        departmentSlug: doctor.departmentSlug,
        designation: doctor.designation,
        qualifications: doctor.qualifications,
        experience: doctor.experience,
        roomNo: doctor.roomNo || "",
        about: doctor.about || "",
        appointmentNote: doctor.appointmentNote || "",
        displayOrder: doctor.displayOrder,

        // add this
        schedule: transformedSchedule,
      });

      // Set schedule separately with transformed data
      if (transformedSchedule.length > 0) {
        console.log("📝 Setting schedule via setValue");
        setValue("schedule", transformedSchedule);
      }

      if (doctor.image) {
        setImagePreview(doctor.image);
      }

      if (doctor.imagePublicId) {
        setOldImagePublicId(doctor.imagePublicId);
      }
    } catch (error) {
      console.error("❌ Error fetching doctor:", error);
      toast.error("Failed to load doctor data");
    }
  };

  fetchDoctor();
}, [id, reset, setValue]);

    useEffect(() => {
    return () => {
        if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
        }
    };
    }, [imagePreview]);
    useEffect(() => {
    const fetchDepartments = async () => {
        try {
        const res = await axiosInstance .get(
            "/departments",
        );

        setDepartments(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    fetchDepartments();
    }, []);

    const onSubmit = async (data: DoctorFormData) => {
      try {
        setIsSubmitting(true);

        // Debug logging for schedule
        console.log("📝 Form Data Schedule:", data.schedule);
        console.log("📝 Schedule Length:", data.schedule?.length);
        if (data.schedule && data.schedule.length > 0) {
          console.log("📝 First Schedule Item:", data.schedule[0]);
        }

        let image = imagePreview;
        let imagePublicId = oldImagePublicId;

        // Upload image if a new image is selected
        if (selectedImage) {
          const formData = new FormData();
          formData.append("image", selectedImage);

          const uploadRes = await axiosInstance.post(
            "/doctors/upload",
            formData,
          );

          image = uploadRes.data.imageUrl;
          imagePublicId = uploadRes.data.publicId;
        }

        const selectedDepartment = departments.find(
          (dept) => dept.slug === data.departmentSlug,
        );

        const payload = {
          ...data,
          department: selectedDepartment?.title || "",
          image: image || "",
          imagePublicId: imagePublicId || "",
          schedule:
            data.schedule?.map((item) => ({
              day: item.day,
              startTime: item.startTime,
              endTime: item.endTime,
            })) || [],
        };

        console.log("✅ Final Payload being sent:", payload);
        console.log("✅ Payload Schedule:", payload.schedule);

        if (isEditMode) {
          await axiosInstance.patch(`/doctors/${id}`, payload);
          toast.success("Doctor updated successfully");
        } else {
          await axiosInstance.post("/doctors", payload);
          toast.success("Doctor created successfully");
        }

        reset();
        setSelectedImage(null);
        setImagePreview(null);
        setOldImagePublicId(null);

        navigate("/doctors");
      } catch (error) {
        console.error("❌ Error saving doctor:", error);
        toast.error("Failed to save doctor");
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
    }

    // Max size: 5MB
    if (file.size > 5 * 1024 * 1024) {
        alert("Image size cannot exceed 5MB.");
        return;
    }

    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Doctor Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Doctor Name */}
          <div>
            <Label>Doctor Name *</Label>

            <Input
              placeholder="Dr. Ahsan Karim"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label>Gender *</Label>

            <select
              {...register("gender")}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <Label>Department *</Label>

        <select
        {...register("departmentSlug")}
        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
        >
        <option value="">
            Select Department
        </option>

        {departments.map((dept: any) => (
            <option
            key={dept._id}
            value={dept.slug}
            >
            {dept.title}
            </option>
        ))}
        </select>

          {errors.departmentSlug && (
            <p className="mt-1 text-sm text-red-500">
              {errors.departmentSlug.message}
            </p>
          )}
          </div>

          {/* Designation */}
          <div>
            <Label>Designation *</Label>

            <Input
              placeholder="Senior Consultant"
              {...register("designation")}
            />

            {errors.designation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Qualifications */}
          <div className="md:col-span-2">
            <Label>Qualifications *</Label>

            <Input
              placeholder="MBBS, MD (Cardiology)"
              {...register("qualifications")}
            />

            {errors.qualifications && (
              <p className="mt-1 text-sm text-red-500">
                {errors.qualifications.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <Label>Experience *</Label>

            <Input
              placeholder="15 Years"
              {...register("experience")}
            />

            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Room Number */}
          <div>
            <Label>Room No (Optional)</Label>

            <Input
              placeholder="301"
              {...register("roomNo")}
            />

            {errors.roomNo && (
              <p className="mt-1 text-sm text-red-500">
                {errors.roomNo.message}
              </p>
            )}
          </div>

          {/* Display Order */}
          <div>
            <Label>Display Order *</Label>

            <Input
              type="number"
              placeholder="1"
              {...register("displayOrder", {
                valueAsNumber: true,
              })}
            />

            {errors.displayOrder && (
              <p className="mt-1 text-sm text-red-500">
                {errors.displayOrder.message}
              </p>
            )}
          </div>

          {/* Appointment Note */}
          <div className="md:col-span-2">
            <Label>Appointment Note (Optional)</Label>

            <textarea
              rows={3}
              placeholder="Available Sunday to Thursday"
              {...register("appointmentNote")}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
            />

            {errors.appointmentNote && (
              <p className="mt-1 text-sm text-red-500">
                {errors.appointmentNote.message}
              </p>
            )}
          </div>
        {/* Doctor Image */}
        <div className="md:col-span-2">
        <Label>Doctor Image (Optional)</Label>

        <FileInput onChange={handleImageChange} />

        {imagePreview && (
            <div className="mt-4 flex flex-col items-start gap-3">
            <img
                src={imagePreview}
                alt="Doctor Preview"
                className="h-32 w-32 rounded-xl border border-gray-200 object-cover dark:border-gray-700"
            />

            <button
                type="button"
                onClick={() => {
                setImagePreview(null);
                setSelectedImage(null);
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Remove Image
            </button>
            </div>
        )}
        </div>


          {/* About Doctor */}
          <div className="md:col-span-2">
            <Label>About Doctor (Optional)</Label>

            <textarea
              rows={5}
              placeholder="Write about doctor..."
              {...register("about")}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
            />

            {errors.about && (
              <p className="mt-1 text-sm text-red-500">
                {errors.about.message}
              </p>
            )}
          </div>
        </div>
      </div>
      
    <DoctorSchedule
    register={register}
    control={control}
    />
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-50"
        >
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Doctor"
              : "Create Doctor"}
        </button>
      </div>
    </form>
  );
}