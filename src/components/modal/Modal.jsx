import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./modal.scss";

const Modal = ({ id, active, children }) => {
  console.log(children);
  return (
    <div id={id} className={`modal ${active ? "active" : ""}`}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
};

export const ModalContent = ({ children, onClose }) => {
  const contentRef = useRef(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (onClose) {
      onClose();
    }
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};
export default Modal;
