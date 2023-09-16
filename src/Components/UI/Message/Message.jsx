import React from "react";
import "../../../Asset/Scss/Components/UI/Message/_message.scss";
const Message = ({ className, label }) => {
  return <div className={`message ${className}`}>{label}</div>;
};

export default Message;
