export function getDepartmentSlug(department) {
  return typeof department?.slug === "string"
    ? department.slug.trim()
    : "";
}

export function hasDepartmentSlug(department) {
  const slug = getDepartmentSlug(department);
  const normalizedSlug = slug.toLowerCase();

  return (
    slug !== "" &&
    normalizedSlug !== "undefined" &&
    normalizedSlug !== "null"
  );
}

export function getDepartmentPath(department) {
  if (!hasDepartmentSlug(department)) {
    return null;
  }

  return `/departments/${encodeURIComponent(getDepartmentSlug(department))}`;
}

export function logDepartmentsForDebugging(source, departments) {
  console.log(`${source} departments returned from API:`, departments);

  if (!Array.isArray(departments)) {
    return;
  }

  const departmentsMissingSlugs = departments.filter(
    (department) => !hasDepartmentSlug(department)
  );

  if (departmentsMissingSlugs.length > 0) {
    console.warn(
      `${source} departments missing valid slugs:`,
      departmentsMissingSlugs
    );
  }
}
