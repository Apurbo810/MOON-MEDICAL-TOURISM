import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface Department {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  isActive: boolean;
}

export default function DepartmentTable() {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res =
        await axiosInstance.get("/departments");

      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/departments/${id}`
      );

      setDepartments((prev) =>
        prev.filter(
          (department) =>
            department._id !== id
        )
      );

      toast.success(
        "Department deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete department"
      );
    }
  };

  const handleStatusToggle = async (
    department: Department
  ) => {
    const action = department.isActive
      ? "deactivate"
      : "activate";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this department?`
    );

    if (!confirmed) return;

    try {
      await axiosInstance.patch(
        `/departments/${department._id}`,
        {
          isActive: !department.isActive,
        }
      );

      setDepartments((prev) =>
        prev.map((item) =>
          item._id === department._id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item
        )
      );

      toast.success(
        `Department ${action}d successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Failed to ${action} department`
      );
    }
  };

  const filteredDepartments =
    departments.filter((department) =>
      department.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-200">
        Loading departments...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/80">

      {/* Header */}
      <div className="border-b border-gray-100 p-5 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          All Departments
        </h3>
      </div>

      {/* Search */}
      <div className="p-5">
        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3"
              >
                Department
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3"
              >
                Description
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredDepartments.length ===
            0 ? (
              <TableRow>
                <TableCell className="px-5 py-6 text-gray-500 dark:text-gray-400">
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDepartments.map(
                (department) => (
                  <TableRow
                    key={department._id}
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={
                              department.icon ||
                              "/images/user/user-17.jpg"
                            }
                            alt={
                              department.title
                            }
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <span className="font-medium text-gray-800 dark:text-white">
                            {
                              department.title
                            }
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {
                        department.shortDescription
                      }
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <button
                        onClick={() =>
                          handleStatusToggle(
                            department
                          )
                        }
                        className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium transition hover:opacity-80 dark:border-gray-700"
                      >
                        <Badge
                          color={
                            department.isActive
                              ? "success"
                              : "error"
                          }
                        >
                          {department.isActive
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </button>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/departments/edit/${department._id}`
                            )
                          }
                          className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              department._id
                            )
                          }
                          className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}