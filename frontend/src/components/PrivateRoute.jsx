import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const auth = useSelector((state) => state.auth);

  return auth.isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
