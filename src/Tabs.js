import React from "react";

export default function Tabs({ currentPage, handlePageChange }) {
  return (
    <ul className="tabs">
      <li className="nav-item">
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
      <li className="nav-item">
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
      <li className="nav-item">
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
