import React, { useState } from "react";
import Tabs from "./Tabs";
import Dashboard from "./components/pages/Dashboard";
import Statistics from "./components/pages/Statistics";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/Signup";
import Login from "./components/pages/Signup";
import "./App.css";

export default function Container() {
  const [currentPage, setCurrentPage] = useState("SignUp");
  const handlePageChange = (page) => setCurrentPage(page);

  const render = () => {
    // if (currentPage === "SignUp") {
    //   return <SignUp handlePageChange={handlePageChange} />;
    // }
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
  return (
    <>
      <div id="header" className="jumbotron jumbotron-fluid">
        <h1 id="appName" className="text-center">
          Tech Time
        </h1>
        <Tabs
          id="navTabs"
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
      <div id="contentContainer">{render()}</div>
    </>
  );
}
