import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component: Component, ...rest }) {
  const authData = useSelector((state) => state.auth);
  return authData ? <Component {...rest} /> : <Navigate to="/" replace />;
}
