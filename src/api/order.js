import axiosInstance from "./axiosInstance";

export const getAllOrders = () => {
  return axiosInstance.get("/Orders");
};
