import axiosInstance from "./axios";

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};