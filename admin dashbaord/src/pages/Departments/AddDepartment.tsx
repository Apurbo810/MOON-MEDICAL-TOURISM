import PageMeta from "../../components/common/PageMeta";
import DepartmentForm from "../../components/departments/DepartmentForm";

export default function AddDepartment() {
  return (
    <>
      <PageMeta
        title="Add Department | Admin Dashboard"
        description="Create a new hospital department"
      />

      <div className="space-y-6">
        <DepartmentForm />
      </div>
    </>
  );
}