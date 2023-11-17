import React from "react";
import "../../../../Asset/Scss/Pages/Report/_barangayProfileReport.scss";
import CustomButton from "../../../../Components/Form/Button";
const GeneralInformation = () => {
  return (
    <div className="information-card">
      <div className="section">
        <CustomButton
          label="Print General Information"
          className="generalInformationBtn"
        />
        <h2>GENERAL INFORMATION</h2>
        <div className="info-item">
          <span>Barangay:</span>
          <span>Tanza 2</span>
        </div>
        <div className="info-item">
          <span>Municipality:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Province:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Region:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Barangay Category:</span>
          <span>Navotas</span>
        </div>
        <div className="info-item">
          <span>Major Economic Source:</span>
          <span>Navotas</span>
        </div>
      </div>

      <div className="section">
        <h2>PHYSICAL CHARACTERISTICS</h2>
        <div className="info-item">
          <span>Land Classification:</span>
          <span>Lowland, Coastal</span>
        </div>
        <div className="info-item">
          <span>Total Land Area:</span>
          <span>1456</span>
        </div>
        <div className="info-item">
          <span>Geographical Location:</span>
          <span>1456</span>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
