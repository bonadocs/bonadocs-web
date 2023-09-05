import Modal from "react-modal";
import React from "react";
import { useLocation } from "react-router-dom";
import { AddContract } from "../Setup/AddContract";
import { AddAction } from "../Actions/AddAction";
import { Collection } from "@bonadocs/core";
import { useBonadocsStore } from "../../store";
import { useEffect } from "react";
import plus from "../../image/plus.svg";
import close from "../../image/close.svg";

export const SidebarButton = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  let mode = location.pathname === "/editor/method" ? true : false;
  let hide = location.pathname === "/editor/variable" ? true : false;
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.60)",
    },
    content: {
      display: "grid",
      top: "50%",
      left: "50%",
      border: "none",
      overflowY: "hidden",
      borderRadius: "8px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: `${mode ? "80%" : "min-content"}`,
      minHeight: `35rem`,
      maxHeight: `70rem`,
      backgroundColor: "transparent",
      width: "40%",
      display: "grid",
    },
  };
  function openModal() {
    setIsOpen(true);
    console.log(location);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const collection = useBonadocsStore((state) => state.collection);
  useEffect(() => {
    console.log("collection");
    if (!collection) {
      return;
    }

    console.log("collection is instance of:", collection instanceof Collection);
  }, [collection]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contract Modal"
      >
        {" "}
        <div className="modal__close" onClick={closeModal}>
          <img className="modal__close__img" src={close} />
        </div>
        <div className="modal__container">
          {location.pathname === "/editor/method" && (
            <>
              <h3 className="modal__title">Add Contract</h3>
              <AddContract
                closeModal={closeModal}
                title="Add Contract"
                newProject={false}
              />
            </>
          )}
          {location.pathname === "/editor/action" && (
            <AddAction closeModal={closeModal} />
          )}
        </div>
      </Modal>
      {!hide && <>
        {mode ? (
          <button onClick={openModal} className="contract__utils__button">
            <img className="contract__utils__button__img" src={plus} />
            Add Contract
          </button>
        ) : (
          <button onClick={openModal} className="contract__utils__button">
            <img className="contract__utils__button__img" src={plus} />
            Add Actions
          </button>
        )}
      </>}
    </>
  );
};
