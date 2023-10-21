import React from "react";
import Message from "../UI/Message/Message";
import "../../Asset/Scss/Components/Form/_checkbox.scss";

const Checkbox = React.forwardRef(
  ({ name, label, errors, type, value, className, ...props }, ref) => {
    return (
      <div className={`customCheckbox ${className}`}>
        <label>
          <input
            name={name}
            ref={ref}
            {...props}
            type="checkbox"
            className="checkbox"
            value={value}
          />
          {label}
        </label>
        {errors && errors[name] && (
          <Message label={errors[name].message} className={"error"} />
        )}
      </div>
    );
  }
);

export default Checkbox;
