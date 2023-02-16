import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../../App.css";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRo, setSelectedRo] = useState(null);

  const addRoToList = () => {
    if (selectedRo) {
      const updatedList = list.map((item) =>
        item === selectedRo
          ? { ro: inputValue, description: descriptionValue, date: dateValue }
          : item
      );
      setList(updatedList);
      setSelectedRo(null);
    } else {
      setList([
        ...list,
        { ro: inputValue, description: descriptionValue, date: dateValue },
      ]);
    }
    setInputValue("");
    setDescriptionValue("");
    setDateValue("");
    handleCloseModal();
  };

  const handleRoChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleShowModal = () => {
    if (selectedRo) {
      setInputValue(selectedRo.ro);
      setDescriptionValue(selectedRo.description);
      setDateValue(selectedRo.date);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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
      <section className="roSection">
        <h4 id="roTitle">My Repair Orders</h4>
        <div id="roButtons">
          <button
            type="button"
            id="addRoButton"
            className="btn btn-secondary"
            onClick={handleShowModal}
          >
            Add RO
          </button>
          <button
            type="button"
            id="editRoButton"
            className="btn btn-secondary"
            disabled={!selectedRo}
            onClick={() => handleShowModal(selectedRo)}
          >
            Edit RO
          </button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Repair Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Repair Order Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter RO Number"
                  value={inputValue}
                  onChange={handleRoChange}
                />
                <Form.Label>Enter Description of work</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                />
                <Form.Label>Enter Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  value={dateValue}
                  onChange={handleDateChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={addRoToList}>
              Add Repair Order
            </Button>
          </Modal.Footer>
        </Modal>

        <ul id="roList">
          {list.map((item, index) => (
            <li
              className="roList"
              key={index}
              onClick={() => setSelectedRo(item)}
              title={item.description}
            >
              {item.ro}: {item.description}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
