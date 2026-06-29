import axios from "axios";

export const getDepartments = async () => {
  const response = await axios.get(
    "http://localhost:5000/departments",
  );

  return response.data;
};