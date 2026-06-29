import { X } from "lucide-react";

export default function AppointmentModal({
  doctor,
  onClose,
}) {
  if (!doctor) return null;

  // Convert 24-hour time to AM/PM
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Group schedule by day
  const groupedSchedule = (
    Array.isArray(doctor.schedule)
      ? doctor.schedule
      : []
  ).reduce((acc, item) => {
    const day = item?.day || "Day TBA";
    const existingDay = acc.find(
      (d) => d.day === day
    );

    if (existingDay) {
      existingDay.times.push(item);
    } else {
      acc.push({
        day,
        times: [item],
      });
    }

    return acc;
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-lg font-bold text-[#243B8F] md:text-2xl">
            Chamber Schedule
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={28} />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="px-6 pt-5">
          <h3 className="text-xl font-semibold">
            {doctor.name || "Unnamed Doctor"}
          </h3>

          <p className="mt-1 text-gray-500">
            {doctor.designation || "Designation TBA"}
          </p>
        </div>

        {/* Room */}
        <div className="mt-6 px-6">
          <div className="rounded-lg bg-[#243B8F] py-4 text-center font-semibold text-white">
            Room No : {doctor.roomNo || "TBA"}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-4 text-left">
                  Day
                </th>

                <th className="border p-4 text-left">
                  Consultation Time
                </th>
              </tr>
            </thead>

            <tbody>
              {groupedSchedule.length > 0 ? (
                groupedSchedule.map(
                  (dayGroup, index) => (
                    <tr key={index}>
                      <td className="border p-4">
                        {dayGroup.day}
                      </td>

                      <td className="border p-4">
                        <div className="flex flex-col gap-2">
                          {dayGroup.times.map(
                            (
                              timeItem,
                              timeIndex
                            ) => (
                              <span key={timeIndex}>
                                {timeItem?.status ===
                                "closed" ? (
                                  <span className="font-medium text-red-500">
                                    Closed
                                  </span>
                                ) : timeItem?.time ? (
                                  timeItem.time
                                ) : timeItem?.startTime &&
                                  timeItem?.endTime ? (
                                  `${formatTime(
                                    timeItem?.startTime
                                  )} - ${formatTime(
                                    timeItem?.endTime
                                  )}`
                                ) : (
                                  "Time TBA"
                                )}
                              </span>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="border p-6 text-center text-gray-500"
                  >
                    No schedule available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Notice */}
        <div className="px-6 pb-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {doctor.appointmentNote ||
              "Appointment information will be available soon."}
          </div>
        </div>
      </div>
    </div>
  );
}
