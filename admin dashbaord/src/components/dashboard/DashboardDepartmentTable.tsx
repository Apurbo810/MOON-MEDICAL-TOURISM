import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../services/axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Department {
  _id: string;
  title: string;
  shortDescription?: string;
  icon?: string;
}

export default function DashboardDepartmentTable() {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get(
          "/departments"
        );

        // Show only first 5 departments
        setDepartments(res.data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          All Departments
        </h3>

        <button
          onClick={() =>
            navigate("/departments/create")
          }
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600"
        >
          + Add Department
        </button>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 text-start"
              >
                Department
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start"
              >
                Description
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {departments.length === 0 ? (
              <TableRow>
                <TableCell className="py-4">
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              departments.map((department) => (
                <TableRow key={department._id}>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl">
                        <img
                          src={
                            department.icon ||
                            "/images/logo/logo-icon.svg"
                          }
                          alt={department.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {department.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs py-4 text-sm text-gray-500 dark:text-gray-400">
                    {department.shortDescription
                      ? department.shortDescription.length > 80
                        ? `${department.shortDescription.slice(0, 80)}...`
                        : department.shortDescription
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}