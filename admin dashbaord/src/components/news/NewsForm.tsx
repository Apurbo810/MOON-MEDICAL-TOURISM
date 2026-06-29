import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";

import {
  newsSchema,
  NewsFormData,
} from "../../schemas/news.schema";

import axiosInstance from "../../services/axios";

export default function NewsForm() {
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setSelectedImage(file);
    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  const onSubmit = async (
    data: NewsFormData
  ) => {
    try {
      setLoading(true);

      let image = "";
      let imagePublicId = "";

      if (selectedImage) {
        const formData = new FormData();

        formData.append(
          "image",
          selectedImage
        );

        const uploadRes =
          await axiosInstance.post(
            "/news/upload",
            formData
          );

        image = uploadRes.data.imageUrl;
        imagePublicId =
          uploadRes.data.publicId;
      }

      await axiosInstance.post(
        "/news",
        {
          title: data.title,
          description:
            data.description,
          image,
          imagePublicId,
        }
      );

      toast.success(
        "News created successfully"
      );

      reset();
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to create news"
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
          News Information
        </h3>

        <div className="space-y-6">
          <div>
            <Label>
              News Title *
            </Label>

            <Input
              placeholder="Hospital launches new ICU..."
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.title
                    .message
                }
              </p>
            )}
          </div>

          <div>
            <Label>
              Description *
            </Label>

            <textarea
              rows={6}
              {...register(
                "description"
              )}
              className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors
                    .description
                    ?.message
                }
              </p>
            )}
          </div>

          <div>
            <Label>
              News Image
            </Label>

            <FileInput
              onChange={
                handleImageChange
              }
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-32 w-full rounded-xl object-cover"
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
          : "Create News"}
      </button>
    </form>
  );
}