import axiosInstance from "../services/axios";

export const getDepartments = async () => {
  const { data } = await axiosInstance.get("/departments");
  return data;
};
