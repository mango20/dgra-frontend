import React from "react";
import Title from "../../Components/UI/Title/Title";
import "../../Asset/Scss/Layout/Container/_contentContainer.scss";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ContentContainer = ({ title, children, add, hasArrow }) => {
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <div className="titleContainer">
          {hasArrow && (
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          )}
          <Title label={title} />
        </div>

        <div className="content">{children}</div>
      </div>
      <div className="content">{add}</div>
    </div>
  );
};

export default ContentContainer;
