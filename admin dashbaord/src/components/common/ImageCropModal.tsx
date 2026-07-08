import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Modal } from "../ui/modal";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (file: File, previewUrl: string) => void;
  title?: string;
  description?: string;
  aspectRatio?: number;
  cropShape?: "rect" | "round";
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImage = async (
  imageSrc: string,
  pixelCrop: Area,
  fileName: string,
): Promise<{ file: File; previewUrl: string }> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context");
  }

  const outputSize = Math.max(pixelCrop.width, pixelCrop.height);
  canvas.width = outputSize;
  canvas.height = outputSize;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to crop image"));
        return;
      }

      const file = new File([blob], fileName, { type: blob.type || "image/jpeg" });
      resolve({
        file,
        previewUrl: URL.createObjectURL(blob),
      });
    }, "image/jpeg", 0.95);
  });
};

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  title = "Adjust profile photo",
  description = "Drag to reposition and zoom to frame your photo perfectly.",
  aspectRatio = 1,
  cropShape = "round",
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.8);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [isOpen, imageSrc]);

  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsCropping(true);

    try {
      const result = await getCroppedImage(imageSrc, croppedAreaPixels, "doctor-photo.jpg");
      onCropComplete(result.file, result.previewUrl);
      onClose();
    } catch (error) {
      console.error("Image crop failed:", error);
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-0 shadow-2xl">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        <div className="relative mx-auto h-[360px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
          {imageSrc ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              showGrid
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No image selected yet.
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Zoom
            </label>
            <input
                type="range"
                min={0.8}
                max={3}
                step={0.1}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={isCropping || !imageSrc}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCropping ? "Preparing..." : "Use photo"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
