import { useState} from "react";
import { Link,useNavigate } from "react-router";
import {EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../schemas/login.schema";
import axiosInstance from "../../services/axios";
import toast from "react-hot-toast";



export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  
const navigate = useNavigate();

const [isLoading, setIsLoading] = useState(false);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema) as Resolver<LoginFormData>,
});
const onSubmit = async (data: LoginFormData) => {
  try {
    setIsLoading(true);

    const res = await axiosInstance.post(
      "/auth/login",
      data
    );

    localStorage.setItem(
      "accessToken",
      res.data.accessToken
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(res.data.admin)
    );

    toast.success("Login successful");

    navigate("/");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Invalid credentials"
    );
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="flex flex-col flex-1">
  <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <div>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign In
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Email */}
          <div>
            <Label>
              Email <span className="text-error-500">*</span>
            </Label>

            <Input
              placeholder="admin@gmail.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label>
              Password <span className="text-error-500">*</span>
            </Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
              />

              <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                Keep me logged in
              </span>
            </div>

            <Link
              to="/reset-password"
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="sm"
            disabled={isLoading}
          >
            {isLoading
              ? "Signing In..."
              : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
