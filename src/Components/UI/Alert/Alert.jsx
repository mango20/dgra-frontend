import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ label }) => {
  return (
    <>
      <Alert key="success" variant="success">
        {label}
      </Alert>
    </>
  );
};

export default CustomAlert;
