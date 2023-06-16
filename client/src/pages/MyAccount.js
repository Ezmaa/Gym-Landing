import React from "react";
import { Navigate } from "react-router-dom";
import Checkout from "../components/Checkout";
import Auth from "../utils/auth";

const MyAccount = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="lg:pt-[140px]">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome</h1>
      <Checkout></Checkout>
    </div>
  );
};

export default MyAccount;
