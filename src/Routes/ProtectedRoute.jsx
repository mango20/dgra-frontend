import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const userType = "Admin";
  if (userType === "Admin") {
    return <Outlet />;
  } else if (userType !== "Admin") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/barangay-profile/about-barangay" />;
  }
};

export const PrincipalRoute = () => {
  const userType = "Principal";
  if (userType === "Principal") {
    return <Outlet />;
  } else if (userType !== "Principal") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/barangay-profile/about-barangay" />;
  }
};

export const ChairmanRoute = () => {
  const userType = "Chairman";
  if (userType === "Chairman") {
    return <Outlet />;
  } else if (userType !== "Chairman") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/barangay-profile/about-barangay" />;
  }
};

export const ResidentRoute = () => {
  const userType = "Resident";
  if (userType === "Resident") {
    return <Outlet />;
  } else if (userType !== "Resident") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/barangay-profile/about-barangay" />;
  }
};
