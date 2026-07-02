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
}


interface Doctor {
  _id: string;
  image?: string;
  name: string;
  designation: string;
  department: string;
  experience: string;
  roomNo?: string;
  isActive: boolean;
}

interface Props {
  dashboardMode?: boolean;
}

export default function DoctorTable({
  dashboardMode = false,
}: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<
    Department[]
  >([]);
  // Filters
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get(
          "/departments"
        );

        setDepartments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search) {
          params.append("search", search);
        }

        if (department) {
          params.append(
            "department",
            department
          );
        }

        if (status) {
          params.append("isActive", status);
        }

        const res =
          await axiosInstance.get(
            `/doctors?${params.toString()}`
          );

        setDoctors(res.data);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [search, department, status]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/doctors/${id}`
      );

      setDoctors((prev) =>
        prev.filter(
          (doctor) => doctor._id !== id
        )
      );

      toast.success(
        "Doctor deleted successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete doctor"
      );
    }
  };

  const handleStatusToggle = async (
    doctor: Doctor
  ) => {
    const action = doctor.isActive
      ? "deactivate"
      : "activate";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this doctor?`
    );

    if (!confirmed) return;

    try {
      await axiosInstance.patch(
        `/doctors/${doctor._id}`,
        {
          isActive: !doctor.isActive,
        }
      );

      setDoctors((prev) =>
        prev.map((item) =>
          item._id === doctor._id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item
        )
      );

      toast.success(
        `Doctor ${action}d successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Failed to ${action} doctor`
      );
    }
  };
   const displayedDoctors = dashboardMode
    ? doctors.slice(0, 5)
    : doctors;

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-200">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/80">

      {/* Header */}
      <div className="border-b border-gray-100 p-5 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          All Doctors
        </h3>

        {/* Filters */}
        <div className="mt-4 flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search doctor..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-brand-800"
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
          >
            <option value="">
              All Departments
            </option>

            {departments.map((dept) => (
              <option
                key={dept._id}
                value={dept.slug}
              >
                {dept.title}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-brand-800"
          >
            <option value="">
              All Status
            </option>

            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>

          <button
            onClick={() =>
              setSearch(query)
            }
            className="rounded-lg bg-brand-500 px-6 py-2 text-white hover:bg-brand-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Doctor
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Department
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Experience
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Room
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start"
              >
                Actions
              </TableCell>

            </TableRow>
          </TableHeader>

          <TableBody>

            {displayedDoctors.length === 0 ? (
              <TableRow>
                <TableCell className="px-5 py-6 text-gray-500 dark:text-gray-400">
                  No doctors found.
                </TableCell>
              </TableRow>
            ) : (
              displayedDoctors.map((doctor) => (
                <TableRow key={doctor._id}>

                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={
                            doctor.image ||
                            "/images/user/user-17.jpg"
                          }
                          alt={doctor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <span className="block font-medium text-gray-800 dark:text-white">
                          {doctor.name}
                        </span>

                        <span className="block text-sm text-gray-500">
                          {doctor.designation}
                        </span>
                      </div>

                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                    {doctor.department}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                    {doctor.experience}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                    {doctor.roomNo || "-"}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() =>
                        handleStatusToggle(doctor)
                      }
                      className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium transition hover:opacity-80 dark:border-gray-700"
                    >
                      <Badge
                        color={
                          doctor.isActive
                            ? "success"
                            : "error"
                        }
                      >
                        {doctor.isActive
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
                            `/doctors/edit/${doctor._id}`
                          )
                        }
                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            doctor._id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
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