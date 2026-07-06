import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";

import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

type AdminProfile = {
  name: string;
  email: string;
  role?: string | null;
  photo?: string | null;
  password?: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

const fallbackAvatar = "/images/user/user.svg";

export default function AdminAccountCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (!storedAdmin) return;

    try {
      const parsedAdmin = JSON.parse(storedAdmin) as AdminProfile;

      setAdmin(parsedAdmin);
      setName(parsedAdmin.name || "");
      setEmail(parsedAdmin.email || "");
      setPhoto(parsedAdmin.photo || "");
    } catch (error) {
      console.error("Failed to parse admin profile", error);
    }
  }, []);

  const handleSave = () => {
    if (!admin) return;

    const updatedAdmin: AdminProfile = {
      ...admin,
      name,
      email,
      photo: photo || null,
      role: admin.role || "admin",
      updatedAt: new Date().toISOString(),
    };

    setAdmin(updatedAdmin);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));

    closeModal();
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={admin?.photo || fallbackAvatar}
                alt={admin?.name || "Admin"}
                className="h-16 w-16 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar;
                }}
              />

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Account Information
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your admin account details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-20">
              <div>
                <p className="mb-2 text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {admin?.name || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {admin?.email || "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium capitalize text-gray-800 dark:text-white">
                  {admin?.role || "admin"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Account Status</p>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Active
                </span>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Account Created</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {admin?.updatedAt ? new Date(admin.updatedAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:w-auto"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            Edit Profile
          </h4>

          <p className="mb-8 text-sm text-gray-500">
            Update your account information.
          </p>

          <form className="space-y-6">
            <div>
              <Label>Full Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label>Photo URL</Label>
              <Input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <Label>Role</Label>
              <Input type="text" value={admin?.role || "admin"} disabled />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancel
              </Button>

              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}