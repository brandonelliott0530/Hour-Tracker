import React from "react";
import "./App.css";

export default function Tabs({ currentPage, handlePageChange }) {
  return (
    <ul className="tabs">
      <li
        className={currentPage === "Dashboard" ? "nav-item-active" : "nav-item"}
      >
        <a
          href="#dashboard"
          onClick={() => handlePageChange("Dashboard")}
          className={
            currentPage === "Dashboard" ? "nav-link-active" : "nav-link"
          }
        >
          Dashboard
        </a>
      </li>
      <li
        className={
          currentPage === "Statistics" ? "nav-item-active" : "nav-item"
        }
      >
        <a
          href="#statistics"
          onClick={() => handlePageChange("Statistics")}
          className={
            currentPage === "Statistics" ? "nav-link-active" : "nav-link"
          }
        >
          Statistics
        </a>
      </li>

      <li
        className={currentPage === "Profile" ? "nav-item-active" : "nav-item"}
      >
        <a
          href="#profile"
          onClick={() => handlePageChange("Profile")}
          className={currentPage === "Profile" ? "nav-link-active" : "nav-link"}
        >
          Profile
        </a>
      </li>
    </ul>
  );
}
