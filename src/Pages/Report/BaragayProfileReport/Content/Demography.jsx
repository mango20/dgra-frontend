import React from "react";
import { Col, Row } from "react-bootstrap";

const Demography = () => {
  return (
    <div className="information-card">
      <div className="section">
        <h2>DEMOGRAPHY</h2>
        <div className="info-item">
          <span>Province:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>City/Municipality:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Barangay:</span>
          <span>Tanza 2</span>
        </div>
        <div className="info-item">
          <span>Purok:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Street:</span>
          <span>Navotas</span>
        </div>
      </div>
    </div>
  );
};

export default Demography;
