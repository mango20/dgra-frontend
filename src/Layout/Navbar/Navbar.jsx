import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../Asset/Scss/Layout/Navbar/_navbar.scss";
const CustomNavbar = () => {
  return (
    <div className="navbar">
      <div className="navbarBrand">
        <h1 className="brgName">Barangay Tanza 2</h1>
        <FontAwesomeIcon icon={faBars} className="faBars" />
        <h1>Disaster Get-Ready Application</h1>
      </div>
      <div className="navbarUserInfo">
        <p>Welcome, tanza2chairman</p>
        <p>1/18/2020, 12:09:14 PM</p>
        <img src={require("../../Asset/Image/sampleImg.jpg")} alt="img" />
      </div>
    </div>
  );
};

export default CustomNavbar;
