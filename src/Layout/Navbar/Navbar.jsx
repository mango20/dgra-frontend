import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../../Asset/Scss/Layout/Navbar/_navbar.scss";
import moment from "moment/moment";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
const CustomNavbar = ({ setShowSidebar, show }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const username = useSelector(
    (state) => state.reducer.userInfo?.userInfo?.username
  );
  const useImg = useSelector(
    (state) => state.reducer.brgyProfile?.brgyProfile?.brgyLogo
  );
  // console.log(useImg);
  const updateCurrentDate = () => {
    const formattedDate = moment().format("M/D/YYYY, h:mm:ss A");
    setCurrentDate(formattedDate);
  };

  useEffect(() => {
    updateCurrentDate();

    const interval = setInterval(() => {
      updateCurrentDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 667);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState); // Use setShowSidebar from props to toggle the Sidebar state
  };

  return (
    <div className="navbar">
      <div className="navbarBrand">
        <h1
          className="brgName"
          style={{ display: show && !isSmallScreen ? "block" : "none" }}
        >
          Barangay Tanza 2
        </h1>

        <FontAwesomeIcon
          icon={faBars}
          className="faBars"
          onClick={toggleSidebar}
        />
        <img src={require("../../Asset/Image/dgra.png")}></img>
        {/* <h1>Disaster Get-Ready Application</h1> */}
      </div>
      <div className="navbarUserInfo">
        <p>Welcome, {username}</p>
        <p>{currentDate}</p>
        <img src={useImg} alt="img" />
      </div>
      {/* Pass the state and handler */}
    </div>
  );
};

export default CustomNavbar;
