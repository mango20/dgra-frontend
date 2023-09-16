import React from "react";
import "../../../Asset/Scss/Components/UI/Title/_title.scss";
const Title = ({ label, className }) => {
  return (
    <div className="title">
      <h1>{label}</h1>
    </div>
  );
};

export default Title;
