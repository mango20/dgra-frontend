import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Asset/Scss/Components/UI/Modal/_modal.scss";
const CustomModal = ({
  show,
  handleAction,
  handleClose,
  size,
  title,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      centered
      className="customModal"
    >
      <Modal.Header className="header">
        <Modal.Title className="title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAction} type="submit">
          Add
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
