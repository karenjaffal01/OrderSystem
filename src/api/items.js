import axiosInstance from "./axiosInstance";

export const getItems = () => axiosInstance.get("/Item");

export const createItem = (payload) =>
  axiosInstance.post("/Item/create", payload);

export const updateItem = (payload) =>
  axiosInstance.put("/Item", payload);

export const deleteItem = (id) =>
  axiosInstance.delete(`/Item/${id}`);
