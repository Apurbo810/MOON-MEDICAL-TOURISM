import PageMeta from "../../components/common/PageMeta";
import DepartmentForm from "../../components/departments/DepartmentForm";

export default function EditDepartment() {
  return (
    <>
      <PageMeta
        title="Edit Department | Admin Dashboard"
        description="Edit an existing hospital department"
      />

      <div className="space-y-6">
        <DepartmentForm />
      </div>
    </>
  );
}
