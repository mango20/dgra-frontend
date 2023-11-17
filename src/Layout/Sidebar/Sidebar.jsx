// Sidebar.jsx

import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import menu from "../../Data/JsData/menu";
import "../../Asset/Scss/Layout/Sidebar/_sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ show, handleClose }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Add this line to get the navigate function
  const [sublabelClicked, setSublabelClicked] = useState(false);
  const [subnavOpen, setSubnavOpen] = useState(
    new Array(menu.length).fill(false)
  );

  const toggleSubnav = (index) => {
    const newSubnavOpen = [...subnavOpen];
    newSubnavOpen[index] = !newSubnavOpen[index];
    setSubnavOpen(newSubnavOpen);
    setSublabelClicked(true);
  };

  return (
    <div
      className={`sidebar ${sublabelClicked ? "highlighted" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="menuContainer">
        {menu.map((val, index) => (
          <div className="menu" key={index}>
            {val.subLabel ? (
              <div
                className={`menuItems ${
                  location.pathname === val.route ? "highlighted" : ""
                }`}
                onClick={() => toggleSubnav(index)}
              >
                <p>{val.label}</p>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            ) : (
              <div
                className={`menuItems`}
                onClick={() => val.onClick && val.onClick(navigate)}
              >
                {/* Use onClick for Logout */}
                <p
                  className={`${
                    location.pathname === val.route ? "highlighted" : ""
                  }`}
                >
                  {val.label}
                </p>
              </div>
            )}

            {val.subLabel && subnavOpen[index] && (
              <>
                {val.subLabel.map((subVal, subIndex) => {
                  const sublabelRoute = `/${val.label
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/${subVal
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`;

                  return (
                    <div key={subIndex} className={`subLabel `}>
                      <Link to={sublabelRoute}>
                        <p>{subVal}</p>
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
