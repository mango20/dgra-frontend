import React from "react";
import Message from "../UI/Message/Message";
import "../../Asset/Scss/Components/Form/_select.scss";

const Select = React.forwardRef(
  (
    { name, label, errors, defaultOptionLabel, data, className, ...props },
    ref
  ) => {
    return (
      <div className={`customSelect ${className}`}>
        <label>{label}</label>
        <div className="inputMsg">
          <select defaultValue="" name={name} ref={ref} {...props}>
            <option value="" disabled>
              {defaultOptionLabel}
            </option>
            {data.map((val) => (
              <option key={val.key} value={val.value}>
                {val.value}
              </option>
            ))}
          </select>
          {errors && errors[name] && (
            <Message label={errors[name].message} className={"error"} />
          )}
        </div>
      </div>
    );
  }
);

export default Select;
