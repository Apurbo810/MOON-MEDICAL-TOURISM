export function getDoctorId(doctor) {
  if (typeof doctor?._id === "string") {
    return doctor._id.trim();
  }

  return "";
}

export function hasDoctorId(doctor) {
  const doctorId = getDoctorId(doctor);
  const normalizedDoctorId = doctorId.toLowerCase();

  return (
    doctorId !== "" &&
    normalizedDoctorId !== "undefined" &&
    normalizedDoctorId !== "null" &&
    /^[a-f\d]{24}$/i.test(doctorId)
  );
}

export function getDoctorPath(doctor) {
  if (!hasDoctorId(doctor)) {
    return null;
  }

  return `/doctors/${encodeURIComponent(getDoctorId(doctor))}`;
}
