import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../../Asset/Scss/Layout/Navbar/_navbar.scss";
import moment from "moment/moment";
import Sidebar from "../Sidebar/Sidebar";
const CustomNavbar = ({ setShowSidebar }) => {
  const [currentDate, setCurrentDate] = useState("");

  // Function to update the current date
  const updateCurrentDate = () => {
    const formattedDate = moment().format("M/D/YYYY, h:mm:ss A");
    setCurrentDate(formattedDate);
  };

  // Update the current date on component mount
  useEffect(() => {
    updateCurrentDate();

    // Set interval to update the date every second
    const interval = setInterval(() => {
      updateCurrentDate();
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState); // Use setShowSidebar from props to toggle the Sidebar state
  };

  return (
    <div className="navbar">
      <div className="navbarBrand">
        <h1 className="brgName">Barangay Tanza 2</h1>
        <FontAwesomeIcon
          icon={faBars}
          className="faBars"
          onClick={toggleSidebar}
        />
        <h1>Disaster Get-Ready Application</h1>
      </div>
      <div className="navbarUserInfo">
        <p>Welcome, tanza2chairman</p>
        <p>{currentDate}</p>
        <img src={require("../../Asset/Image/sampleImg.png")} alt="img" />
      </div>
      {/* Pass the state and handler */}
    </div>
  );
};

export default CustomNavbar;
