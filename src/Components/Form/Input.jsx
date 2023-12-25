import React from "react";
import "../../Asset/Scss/Components/Form/_input.scss";
import Message from "../UI/Message/Message";

const CustomInput = React.forwardRef(
  (
    {
      name,
      placeholder,
      label,
      errors,
      type,
      className,
      customLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`customInput ${className}`}>
        <div className={`customLabel ${customLabel}`}>
          {label && <label>{label}</label>}
        </div>
        <div className="inputMsg">
          <input
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

export default CustomInput;
