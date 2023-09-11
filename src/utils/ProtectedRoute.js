import React from "react";
import { Navigate,  useLocation, Outlet } from "react-router-dom";
import { useBonadocsStore } from "../store";

export const ProtectedRoute = () => {
  const collection = useBonadocsStore((state) => state.collection);

  let location = useLocation();
  console.log("location", location.pathname);
  if (collection == null) {
    return <Navigate to="/" replace/>;
  }

  if (collection !== null && location.pathname === "/") {
    return <Navigate to={"/editor/method"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
