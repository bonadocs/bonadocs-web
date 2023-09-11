import Modal from "react-modal";
import { useState } from "react";
import close from "../../image/close.svg"

export const VariableModal = ({ children, isOpen, setIsOpen }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.60)",
    },
    content: {
      display: "grid",
      top: "30%",
      left: "50%",
      border: "none",
      overflowY: "hidden",
      borderRadius: "8px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: `min-content`,
      minHeight: `20rem`,
      maxHeight: `70rem`,
      backgroundColor: "transparent",
      width: "40%",
      display: "grid",
    },
  };
  function openModal() {
    setIsOpen(!isOpen);
  }

  function closeModal() {
    setIsOpen(!isOpen);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Contract Modal"
    >
      <div className="modal__close" onClick={closeModal}>
        <img className="modal__close__img" src={close} />
      </div>
      <div className="modal__container">
        <>
          {children}
        </>
      </div>
    </Modal>
  );
};
