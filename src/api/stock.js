import axiosInstance from "./axiosInstance";

export const getAllStock = () => axiosInstance.get("/Stock/all");
export const createStock = (itemId) => axiosInstance.post(`/Stock/create/${itemId}`);
export const updateStockQuantity = (stockId, quantity) => axiosInstance.put(`/Stock/updateQuantity/${stockId}/${quantity}`);
export const deleteStock = (stockId) => axiosInstance.delete(`/Stock/${stockId}`);
