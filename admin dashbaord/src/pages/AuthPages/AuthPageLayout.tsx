import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-1 bg-white p-6 dark:bg-gray-900 sm:p-0">
      <div className="relative flex h-screen w-full flex-col justify-center dark:bg-gray-900 lg:flex-row sm:p-0">
        {/* Left Side - Login Form */}
        {children}

        {/* Right Side - Branding */}
        <div className="hidden h-full w-full items-center bg-brand-950 dark:bg-white/5 lg:grid lg:w-1/2">
          <div className="relative z-1 flex items-center justify-center">
            <GridShape />

            <div className="flex max-w-md flex-col items-center px-6">
              <h1 className="mb-6 text-center text-4xl font-bold text-white">
                Hospital Admin Dashboard
              </h1>

              <p className="text-center text-lg text-gray-300 dark:text-white/70">
                Manage doctors, departments, news, gallery, and hospital information from one centralized dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}