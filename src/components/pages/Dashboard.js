import React from "react";
import "../../App.css";

export default function Dashboard() {
  return (
    <>
      <h1 id="dashboard-title"> My Dashboard</h1>
      <section id="dashboard-summary">
        <h4>Quick Look</h4>
        <ul className="list-group ">
          <li className="list-group-item">
            Hours this pay period: <span id="totalHours"></span>
          </li>
          <li className="list-group-item">
            Efficiency this pay period: <span id="payPeriodEfficiency"></span>
          </li>
        </ul>
      </section>
      <section id="roSection">
        <h4 id="roTitle">My Repair Orders</h4>
        <div id="roButtons">
          <button type="button" id="addRoButton" className="btn btn-secondary">
            Add RO
          </button>
          <button type="button" id="editRoButton" className="btn btn-secondary">
            Edit RO
          </button>
        </div>
        <ul id="roList">
          <h6 id="roDefaultText">No repair orders found!</h6>
        </ul>
        <div id="totalRoCount">
          <h6 id="roCountTitle">
            Total: <span id="roCount">0</span>
          </h6>
        </div>
      </section>
    </>
  );
}
