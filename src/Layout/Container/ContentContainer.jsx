import React from "react";
import Title from "../../Components/UI/Title/Title";
import "../../Asset/Scss/Layout/Container/_contentContainer.scss";
const ContentContainer = ({ title, children, add }) => {
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <div className="titleContainer">
          <Title label={title} />
        </div>

        <div className="content">{children}</div>
      </div>
      <div className="content">{add}</div>
    </div>
  );
};

export default ContentContainer;
