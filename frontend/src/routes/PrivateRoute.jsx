import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector((store) => store.authReducer);
  
  return user.token ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
