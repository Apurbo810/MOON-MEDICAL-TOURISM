import { X } from "lucide-react";

export default function AppointmentModal({
  doctor,
  onClose,
}) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg md:text-2xl font-bold text-[#243B8F]">
            Chamber Schedule
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={28} />
          </button>
        </div>

        {/* Doctor Name */}
        <div className="px-6 pt-5">
          <h3 className="font-semibold text-xl">
            {doctor.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {doctor.designation}
          </p>
        </div>

        {/* Room */}
        <div className="px-6 mt-6">
          <div className="bg-[#243B8F] text-white rounded-lg py-4 text-center font-semibold">
            Room No : {doctor.roomNo || "TBA"}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-slate-100">
                <th className="p-4 border text-left">
                  Day
                </th>

                <th className="p-4 border text-left">
                  Consultation Time
                </th>
              </tr>
            </thead>

            <tbody>
              {doctor.schedule.map((item, index) => (
                <tr key={index}>
                  <td className="border p-4">
                    {item.day}
                  </td>

                  <td className="border p-4">
                    {item.status === "closed" ? (
                      <span className="text-red-500 font-medium">
                        Closed
                      </span>
                    ) : (
                      item.time
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Notice */}
        <div className="px-6 pb-6">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-center">
            {doctor.appointmentNote ||
              "Appointment information will be available soon."}
          </div>
        </div>

      </div>
    </div>
  );
}