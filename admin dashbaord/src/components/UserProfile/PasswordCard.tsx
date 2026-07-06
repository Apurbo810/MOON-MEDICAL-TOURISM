import { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import axiosInstance from "../../services/axios";

export default function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      setMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      setMessage("");
      return;
    }

    try {
      await axiosInstance.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setMessage("Password updated successfully.");
    } catch (error: any) {
      console.error("Failed to update password", error);
      setError(
        error?.response?.data?.message || "Unable to update password right now."
      );
      setMessage("");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/80 lg:p-6">
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Change Password
        </h4>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update your password securely from this section.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Current Password</Label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
            <span
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showCurrentPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
        </div>

        <div>
          <Label>New Password</Label>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showNewPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
        </div>

        <div>
          <Label>Confirm New Password</Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showConfirmPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {message ? <p className="text-sm text-green-600">{message}</p> : null}

        <div className="flex justify-end">
          <Button type="submit" size="sm">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
