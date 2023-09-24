import React from "react";
import "../../Asset/Scss/Layout/Container/_customContainer.scss";
const CustomContainer = ({ children, className, title }) => {
  return (
    <div className={`customContainer ${className}`}>
      <h1>{title}</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default CustomContainer;
