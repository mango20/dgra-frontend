import React from "react";
import "../../Asset/Scss/Components/Form/_inputImg.scss";

const InputImg = ({ label }) => {
  return (
    <div className="inputImg">
      <label>{label}</label>
      <div className="inputImgContent">
        <img src={require("../../Asset/Image/sampleImg.png")}></img>
        <input type="file" accept=".jpg, .png" />
      </div>
    </div>
  );
};

export default InputImg;
