import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
