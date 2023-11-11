import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import menu from "../../Data/menu.json";
import "../../Asset/Scss/Layout/Sidebar/_sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ show, handleClose }) => {
  const location = useLocation();
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

  console.log(show);

  return (
    <div
      className={`sidebar ${sublabelClicked ? "highlighted" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="menuContainer">
        {menu.map((val, index) => {
          return (
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
                <div className={`menuItems`}>
                  <Link to={`/${val.label.replace(/\s+/g, "-").toLowerCase()}`}>
                    <p
                      className={`${
                        location.pathname === val.route ? "highlighted" : ""
                      }`}
                    >
                      {val.label}
                    </p>
                  </Link>
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

                    console.log(sublabelRoute);

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
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
