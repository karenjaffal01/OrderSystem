import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token: reduxToken, role: reduxRole } = useSelector((state) => state.auth);

  const token = reduxToken || localStorage.getItem("token");
  const role = reduxRole || localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
export default ProtectedRoute;