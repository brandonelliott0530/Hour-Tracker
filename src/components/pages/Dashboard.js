import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import "../../App.css";

export default function Dashboard() {
  // State variables
  const [list, setList] = useState(loadROListFromStorage());
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRo, setSelectedRo] = useState(null);
  const [typeOfWork, setTypeOfWork] = useState("");
  const [lines, setLines] = useState([]);
  const [lineDescription, setLineDescription] = useState("");
  const [lineHours, setLineHours] = useState("");
  const [editLineIndex, setEditLineIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  // Function to load RO list from localStorage
  function loadROListFromStorage() {
    const storedList = localStorage.getItem("rolist");
    return storedList ? JSON.parse(storedList) : [];
  }

  // Function to save RO list to localStorage
  function saveROListToLocalStorage(list) {
    localStorage.setItem("rolist", JSON.stringify(list));
  }

  // Function to calculate total hours
  const calculateTotalHours = () => {
    const total = list.reduce((acc, ro) => {
      return (
        acc +
        ro.lines.reduce((lineAcc, line) => lineAcc + parseFloat(line.hours), 0)
      );
    }, 0);
    setTotalHours(total);
  };

  // Effect to save list to localStorage whenever it changes
  useEffect(() => {
    saveROListToLocalStorage(list);
    calculateTotalHours();
  }, [list]);

  // Effect to update modal state when RO selection changes
  useEffect(() => {
    if (!showModal) {
      resetModal();
    }
  }, [selectedRo]);

  // Reset modal fields
  const resetModal = () => {
    setInputValue("");
    setDescriptionValue("");
    setDateValue("");
    setTypeOfWork("");
    setLines([]);
    setLineDescription("");
    setLineHours("");
    setEditLineIndex(null);
  };

  // Handle changes in form inputs
  const handleRoChange = (event) => setInputValue(event.target.value);
  const handleDescriptionChange = (event) =>
    setDescriptionValue(event.target.value);
  const handleDateChange = (event) => setDateValue(event.target.value);
  const handleTypeOfWorkChange = (event) => setTypeOfWork(event.target.value);
  const handleLineDescriptionChange = (event) =>
    setLineDescription(event.target.value);
  const handleLineHoursChange = (event) => setLineHours(event.target.value);

  // Add line item to lines
  const addLine = () => {
    if (!lineDescription || !lineHours) {
      setErrorMessage("Please fill out all fields for the line item.");
      return;
    }

    const newLine = { description: lineDescription, hours: lineHours };
    if (editLineIndex !== null) {
      const updatedLines = [...lines];
      updatedLines[editLineIndex] = newLine;
      setLines(updatedLines);
    } else {
      setLines([...lines, newLine]);
    }

    setLineDescription("");
    setLineHours("");
    setEditLineIndex(null);
    setErrorMessage("");
  };

  // Edit line item
  const editLine = (index) => {
    const lineToEdit = lines[index];
    setLineDescription(lineToEdit.description);
    setLineHours(lineToEdit.hours);
    setEditLineIndex(index);
  };

  // Delete line item
  const deleteLine = (index) => {
    const updatedLines = lines.filter((_, i) => i !== index);
    setLines(updatedLines);
  };

  // Add or edit RO to list
  const addRoToList = () => {
    if (!inputValue || !descriptionValue || !typeOfWork) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const newRo = {
      ro: inputValue,
      description: descriptionValue,
      date: dateValue,
      typeOfWork: typeOfWork,
      lines: [...lines],
    };

    if (selectedRo) {
      const updatedList = list.map((item) =>
        item === selectedRo ? newRo : item
      );
      setList(updatedList);
      setSelectedRo(null);
    } else {
      setList([...list, newRo]);
    }

    resetModal();
    handleCloseModal();
  };

  // Show modal for adding/editing RO
  const handleShowModal = (ro) => {
    if (ro) {
      setInputValue(ro.ro);
      setDescriptionValue(ro.description);
      setDateValue(ro.date);
      setTypeOfWork(ro.typeOfWork);
      setLines(ro.lines ? [...ro.lines] : []);
      setSelectedRo(ro);
    } else {
      resetModal();
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  return (
    <>
      <h1 id="dashboard-title">My Dashboard</h1>
      <section id="dashboard-summary">
        <h4>Quick Look</h4>
        <ul className="list-group">
          <li className="list-group-item">
            Hours this pay period: <span id="totalHours">{totalHours}</span>
          </li>
          <li className="list-group-item">
            Efficiency this pay period: <span id="payPeriodEfficiency"></span>
          </li>
        </ul>
      </section>
      <section className="roSection">
        <h4 id="roTitle">My Active Repair Orders</h4>
        <div id="roButtons">
          <button
            type="button"
            id="addRoButton"
            className="btn btn-secondary"
            onClick={() => handleShowModal(null)}
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
          <Modal.Header>
            <Modal.Title>
              {selectedRo ? "Edit Repair Order" : "Add Repair Order"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Repair Order Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="RO Number"
                  value={inputValue}
                  onChange={handleRoChange}
                />
                <Form.Label>Enter Description of work</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                />
                <Form.Label>Type of Work</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleTypeOfWorkChange}
                  value={typeOfWork}
                >
                  <option value="">Select Work Type</option>
                  <option value="Customer Pay">Customer Pay</option>
                  <option value="Warranty">Warranty</option>
                </Form.Control>
                <Form.Label>Enter Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  value={dateValue}
                  onChange={handleDateChange}
                />
              </Form.Group>

              {/* Lines section */}
              <Form.Group>
                <Form.Label>Lines</Form.Label>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Estimated Hours</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((line, index) => (
                      <tr key={index}>
                        <td>{line.description}</td>
                        <td>{line.hours}</td>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => editLine(index)}
                          >
                            Edit
                          </Button>{" "}
                          |{" "}
                          <Button
                            variant="link"
                            onClick={() => deleteLine(index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Form.Control
                  type="text"
                  placeholder="Line Description"
                  value={lineDescription}
                  onChange={handleLineDescriptionChange}
                />
                <Form.Control
                  type="number"
                  placeholder="Estimated Hours"
                  value={lineHours}
                  onChange={handleLineHoursChange}
                />
                <Button variant="primary" onClick={addLine}>
                  {editLineIndex !== null ? "Update Line" : "Add Line"}
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={addRoToList}>
              {selectedRo ? "Save Changes" : "Add Repair Order"}
            </Button>
          </Modal.Footer>
        </Modal>

        <ul id="roList">
          {list.map((item, index) => (
            <li
              className="roList"
              key={index}
              onClick={() => handleShowModal(item)}
              title={item.description}
            >
              {item.ro}: {item.description}
            </li>
          ))}
        </ul>
        <div className="quickStats">
          <p id="totalRo">Total ROs: {list.length}</p>
        </div>
      </section>
    </>
  );
}
