import React from "react";
import "../../Asset/Scss/Layout/Container/_customContainer.scss";
const CustomContainer = ({ children, title }) => {
  return (
    <div className="customContainer">
      <h1>{title}</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default CustomContainer;
