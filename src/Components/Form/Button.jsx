import React from "react";
import "../../Asset/Scss/Components/Form/_button.scss";
const CustomButton = ({ className, label, type, onClick }) => {
  return (
    <>
      <button
        type={type}
        className={`customButton ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default CustomButton;
