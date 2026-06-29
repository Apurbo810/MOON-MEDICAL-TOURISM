import { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

import {
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";

import Badge from "../ui/badge/Badge";

interface Doctor {
  _id: string;
  isActive: boolean;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export default function HospitalMetrics() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get(
          "/doctors"
        );

        setDoctors(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  const totalDoctors = doctors.length;

  const activeDoctors = doctors.filter(
    (doctor) => doctor.isActive
  ).length;

  const inactiveDoctors = doctors.filter(
    (doctor) => !doctor.isActive
  ).length;

  const today = new Date().toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );

  const availableToday = doctors.filter(
    (doctor) =>
      doctor.schedule?.some(
        (item) => item.day === today
      )
  ).length;

  const cards = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />,
    },
    {
      title: "Active Doctors",
      value: activeDoctors,
      icon: <ArrowUpIcon className="size-6 text-gray-800 dark:text-white/90" />,
    },
    {
      title: "Inactive Doctors",
      value: inactiveDoctors,
      icon: <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />,
    },
    {
      title: "Available Today",
      value: availableToday,
      icon: <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            {card.icon}
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {card.title}
              </span>

              <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                {card.value}
              </h4>
            </div>

            <Badge color="success">
              <ArrowUpIcon />
              Live
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}