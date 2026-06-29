import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";

import {
  departmentSchema,
  DepartmentFormData,
} from "../../schemas/department.schema";

import axiosInstance from "../../services/axios";

export default function DepartmentForm() {
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);
    // Put useEffect here
    useEffect(() => {
        return () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        };
    }, [imagePreview]);
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    });

    const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(
        URL.createObjectURL(file)
    );
    };

  const onSubmit = async (
    data: DepartmentFormData
  ) => {
    try {
      setLoading(true);

      let icon = "";
      let iconPublicId = "";

      // upload image
      if (selectedImage) {
        const formData = new FormData();

        formData.append(
          "image",
          selectedImage
        );

        const uploadRes =
          await axiosInstance.post(
            "/departments/upload",
            formData
          );

        icon = uploadRes.data.imageUrl;
        iconPublicId =
          uploadRes.data.publicId;
      }

      // create slug
      const slug = data.title
        .toLowerCase()
        .replace(/\s+/g, "-");

      await axiosInstance.post(
        "/departments",
        {
          title: data.title,
          slug,
          shortDescription:
            data.shortDescription,
          icon,
          iconPublicId,
        }
      );
 
      toast.success(
        "Department created successfully"
      );
           // Clear form
        reset();

        // Clear image preview
        setSelectedImage(null);
        setImagePreview(null);
    } catch (error: any) {
        console.log(error);

        toast.error(
            error?.response?.data?.message ||
            "Failed to create department"
        );
        } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
          Department Information
        </h3>

        <div className="space-y-6">

          {/* Name */}
          <div>
            <Label>
              Department Name *
            </Label>

            <Input
              placeholder="Cardiology"
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>
              Short Description *
            </Label>

            <textarea
              rows={4}
              {...register(
                "shortDescription"
              )}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
            />

            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.shortDescription
                    .message
                }
              </p>
            )}
          </div>

          {/* Logo */}
          <div>
            <Label>
              Department Logo
            </Label>

            <FileInput
              onChange={
                handleImageChange
              }
            />

            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-4 h-24 w-24 rounded-xl object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-brand-500 px-6 py-3 text-white"
      >
        {loading
          ? "Creating..."
          : "Create Department"}
      </button>
    </form>
  );
}