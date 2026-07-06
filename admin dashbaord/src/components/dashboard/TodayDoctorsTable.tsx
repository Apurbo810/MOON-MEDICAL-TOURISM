import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";
import { useNavigate } from "react-router-dom";
import maleAvatar from "../../assets/doctors/default-male.svg";
import femaleAvatar from "../../assets/doctors/default-female.svg";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface Doctor {
  _id: string;
  image?: string;
  name: string;
  designation: string;
  department: string;
  roomNo?: string;
  gender?: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export default function TodayDoctorsTable() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get(
          "/doctors"
        );

        const today =
          new Date().toLocaleDateString(
            "en-US",
            { weekday: "long" }
          );

        const todayDoctors =
          res.data.filter((doctor: Doctor) =>
            doctor.schedule?.some(
              (item) => item.day === today
            )
          );

        setDoctors(todayDoctors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Doctors Available Today
        </h3>

        <button
          onClick={() =>
            navigate("/doctors/create")
          }
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm text-white"
        >
          + Add Doctor
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 text-start"
              >
                Doctor
              </TableCell>

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
                Room
              </TableCell>

              <TableCell
                isHeader
                className="py-3 text-start"
              >
                Schedule
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell className="py-4">
                  No doctors available today.
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doctor) => {
                const today =
                  new Date().toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                  );

                const schedule =
                  doctor.schedule.find(
                    (s) => s.day === today
                  );

                return (
                  <TableRow key={doctor._id}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full">
                          <img
                            src={
                              doctor.image ||
                              (doctor.gender === "female"
                                ? femaleAvatar
                                : maleAvatar)
                            }
                            alt={doctor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {doctor.name}
                          </p>

                          <span className="text-sm text-gray-500">
                            {
                              doctor.designation
                            }
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {doctor.department}
                    </TableCell>

                    <TableCell>
                      {doctor.roomNo || "-"}
                    </TableCell>

                    <TableCell>
                      <Badge color="success">
                        {schedule
                          ? `${schedule.startTime} - ${schedule.endTime}`
                          : "N/A"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}