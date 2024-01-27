import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Demography = () => {
  const generalInfo = useSelector(
    (state) => state.reducer.brgyProfile?.brgyProfile
  );
  return (
    <div className="information-card">
      <div className="section">
        <h2>DEMOGRAPHY</h2>
        <div className="info-item">
          <span>Province:</span>
          <span>{generalInfo.province}</span>
        </div>
        <div className="info-item">
          <span>City/Municipality:</span>
          <span>{generalInfo.municipality}</span>
        </div>
        <div className="info-item">
          <span>Barangay:</span>
          <span>{generalInfo.barangay}</span>
        </div>
        <div className="info-item">
          <span>Purok:</span>
          <span>{generalInfo.street}</span>
        </div>
        {/* <div className="info-item">
          <span>Street:</span>
          <span>Navotas</span>
        </div> */}
      </div>
    </div>
  );
};

export default Demography;
