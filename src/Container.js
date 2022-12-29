import React, { useState } from "react";
import Tabs from "./Tabs";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import Profile from "./Profile";
import SignUp from "./SignUp";
import Login from "./Login";
import "./App.css";

export default function Container() {
  const [currentPage, setCurrentPage] = useState("SignUp");
  const handlePageChange = (page) => setCurrentPage(page);

  const render = () => {
    if (currentPage === "SignUp") {
      return <SignUp handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Dashboard") {
      return <Dashboard handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Profile") {
      return <Profile handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Statistics") {
      return <Statistics handlePageChange={handlePageChange} />;
    }
  };
}
