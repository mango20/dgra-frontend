import React from "react";
import Message from "../UI/Message/Message";
import "../../Asset/Scss/Components/Form/_textarea.scss";

const CustomTextArea = React.forwardRef(
  ({ name, placeholder, label, errors, type, className, ...props }, ref) => {
    return (
      <div className={`customTextArea ${className}`}>
        <label>{label}</label>
        <div className="inputMsg">
          <textarea
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...props}
            type={type}
          />
          {errors && errors[name] && (
            <Message label={errors[name].message} className={"error"} />
          )}
        </div>
      </div>
    );
  }
);

export default CustomTextArea;
