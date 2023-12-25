import React from "react";
import "../../../../Asset/Scss/Pages/Report/_barangayProfileReport.scss";
import CustomButton from "../../../../Components/Form/Button";
import { useSelector } from "react-redux";
const GeneralInformation = () => {
  const generalInfo = useSelector(
    (state) => state.reducer.brgyProfile.brgyProfile
  );
  console.log(generalInfo);
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printDocument =
      "<!DOCTYPE html><html><head><title>Print Document</title>" +
      '<link rel="stylesheet" type="text/css" href="/path/to/printStyles.css">' +
      "</head><body>" +
      '<div class="information-card">' +
      document.querySelector(".print").innerHTML +
      "</div></body></html>";
    printWindow.document.write(printDocument);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="information-card">
      <div className="section">
        <CustomButton
          label="Print General Information"
          className="generalInformationBtn"
          onClick={handlePrint}
        />
        <div className="print">
          <h2>GENERAL INFORMATION</h2>
          <div className="info-item">
            <span>Barangay:</span>
            <span>{generalInfo.barangay}</span>
          </div>
          <div className="info-item">
            <span>Municipality:</span>
            <span>{generalInfo.municipality}</span>
          </div>
          <div className="info-item">
            <span>Province:</span>
            <span>{generalInfo.province}</span>
          </div>
          <div className="info-item">
            <span>Region:</span>
            <span>{generalInfo.region}</span>
          </div>
          <div className="info-item">
            <span>Barangay Category:</span>
            <span>{generalInfo.municipality}</span>
          </div>
          <div className="info-item">
            <span>Major Economic Source:</span>
            <span>{generalInfo.economic?.join(", ")}</span>
          </div>

          <div className="section">
            <h2>PHYSICAL CHARACTERISTICS</h2>
            <div className="info-item">
              <span>Land Classification:</span>
              <span>{generalInfo.landClassification?.join(", ")}</span>
            </div>
            <div className="info-item">
              <span>Total Land Area:</span>
              <span>{generalInfo.totalLandArea}</span>
            </div>
            <div className="info-item">
              <span>Geographical Location:</span>
              <span>
                {generalInfo.coordinates?.latitude || "N/A"} &&
                {generalInfo.coordinates?.longitude || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
