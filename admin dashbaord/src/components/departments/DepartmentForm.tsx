import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";

import {
  departmentSchema,
  DepartmentFormData,
} from "../../schemas/department.schema";

import axiosInstance from "../../services/axios";

export default function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oldImagePublicId, setOldImagePublicId] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
    },
  });

  useEffect(() => {
    if (!isEditMode) return;

    const fetchDepartment = async () => {
      try {
        const res = await axiosInstance.get(
          `/departments/${id}`
        );
        const department = res.data;

        applyDepartmentData(department);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          try {
            const listRes = await axiosInstance.get(
              "/departments"
            );
            const departments = Array.isArray(
              listRes.data
            )
              ? listRes.data
              : listRes.data?.data || [];
            const department = departments.find(
              (item: any) =>
                item._id === id ||
                item.id === id ||
                item.slug === id
            );

            if (!department) {
              throw new Error("Department not found");
            }

            applyDepartmentData(department);
          } catch (fallbackError) {
            console.error(fallbackError);
            toast.error("Failed to load department data");
          }
          return;
        }

        console.error(error);
        toast.error("Failed to load department data");
      }
    };

    const applyDepartmentData = (department: any) => {
      reset({
        title: department.title || "",
        shortDescription:
          department.shortDescription || "",
      });

      if (department.icon) {
        setImagePreview(department.icon);
      }

      if (department.iconPublicId) {
        setOldImagePublicId(department.iconPublicId);
      }
    };

    fetchDepartment();
  }, [id, isEditMode, reset]);

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (
    data: DepartmentFormData
  ) => {
    try {
      setLoading(true);

      let icon = "";
      let iconPublicId = oldImagePublicId || "";

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadRes =
          await axiosInstance.post(
            "/departments/upload",
            formData
          );

        icon = uploadRes.data.imageUrl;
        iconPublicId = uploadRes.data.publicId;
      } else if (isEditMode && imagePreview) {
        icon = imagePreview;
      }

      const slug = data.title
        .toLowerCase()
        .replace(/\s+/g, "-");

      const payload = {
        title: data.title,
        slug,
        shortDescription: data.shortDescription,
        icon,
        iconPublicId,
      };

      if (isEditMode) {
        await axiosInstance.patch(
          `/departments/${id}`,
          payload
        );
        toast.success("Department updated successfully");
      } else {
        await axiosInstance.post(
          "/departments",
          payload
        );
        toast.success("Department created successfully");
      }

      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setOldImagePublicId(null);
      navigate("/departments");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          (isEditMode
            ? "Failed to update department"
            : "Failed to create department")
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
          <div>
            <Label>Department Name *</Label>

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

          <div>
            <Label>Short Description *</Label>

            <textarea
              rows={4}
              {...register("shortDescription")}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
            />

            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <Label>Department Logo</Label>

            <FileInput onChange={handleImageChange} />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Department preview"
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
          ? isEditMode
            ? "Updating..."
            : "Creating..."
          : isEditMode
            ? "Update Department"
            : "Create Department"}
      </button>
    </form>
  );
}