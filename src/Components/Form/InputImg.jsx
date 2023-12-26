import React, { useState, useEffect } from "react";
import "../../Asset/Scss/Components/Form/_inputImg.scss";
import Message from "../UI/Message/Message";
import sampleImg from "../../Asset/Image/sampleImg.png";
const InputImg = React.forwardRef(
  (
    {
      name,
      placeholder,
      label,
      errors,
      type,
      className,
      imageData,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
      if (imageData && imageData.showImage) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    }, [imageData]);

    const handleFileChange = (event) => {
      onChange(event); // Trigger the parent's onChange function (convertToBase64 in your case)
      setShowImage(true); // Display the image preview after file selection
    };

    return (
      <div className="inputImg">
        <label>{label}</label>
        <div className="inputImgContent">
          {showImage && imageData && (
            <div>
              <img
                src={imageData.base64textString || sampleImg}
                alt={imageData.imageName || "Default Logo"}
              />
            </div>
          )}
          <input
            type="file"
            accept=".jpg, .png"
            ref={ref}
            {...props}
            name={name}
            onChange={handleFileChange} // Handle file change event
          />
          {errors && errors[name] && (
            <Message label={errors[name].message} className={"error"} />
          )}
        </div>
      </div>
    );
  }
);

export default InputImg;
