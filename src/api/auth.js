import  axiosInstance  from "./axiosInstance";
export const login = (credentials) => {
    return axiosInstance.post("/Auth/login", credentials);
}
export const register = (credentials) => {
    return axiosInstance.post("/Auth/register", credentials);
}