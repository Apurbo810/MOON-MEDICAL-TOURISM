import PageMeta from "../../components/common/PageMeta";
import DoctorForm from "../../components/doctors/DoctorForm";

export default function EditDoctor() {
  return (
    <>
      <PageMeta
        title="Edit Doctor"
        description="Edit doctor information"
      />

      <DoctorForm />
    </>
  );
}