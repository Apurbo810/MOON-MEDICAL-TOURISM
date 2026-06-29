import PageMeta from "../../components/common/PageMeta";

import HospitalMetrics from "../../components/dashboard/HospitalMetrics";

import TodayDoctorsTable from "../../components/dashboard/TodayDoctorsTable";

import DashboardDepartmentTable from "../../components/dashboard/DashboardDepartmentTable";

import DoctorTable from "../../components/doctors/DoctorTable";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Hospital Dashboard"
        description="Hospital Management Dashboard"
      />

      <div className="space-y-6">
        {/* Metrics */}
        <HospitalMetrics />

        {/* Today + Departments */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <TodayDoctorsTable />
        <DashboardDepartmentTable />
        </div>

        {/* All Doctors */}
        <DoctorTable
          dashboardMode={true}
        />
      </div>
    </>
  );
}