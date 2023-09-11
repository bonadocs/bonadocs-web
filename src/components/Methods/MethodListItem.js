import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../../image/chevron-down.svg";
import { useState, useEffect, useRef } from "react";
import { AccordionContent } from "../Accordion/AccordionContent";
import { Collection } from "@bonadocs/core";
import { useBonadocsStore } from "../../store";
import { groupByContract } from "../../utils/contractGrouping";
import refresh from "../../image/refresh.svg";
import clsx from "clsx";
import { MethodItem2 } from "./MethodItem2";
import { useNavigate } from "react-router";
import edit from "../../image/edit.svg";
import trash from "../../image/trash.svg";
import Modal from "react-modal";
import close from "../../image/close.svg";
import { toast } from "react-toastify";
import { MethodItemInput } from "./MethodItemInput";

export const MethodListItem = ({ header, read, methods, index }) => {
  const [contractDescription, setContractDescription] = useState("");
  const collection = useBonadocsStore((state) => state.collection);

  useEffect(() => {
    setContractDescription("");
    collection.data.contracts.forEach((item) => {
      if (header === item.id) {
        typeof item.docs === "string" && setContractDescription(item);
      }
    });
  }, []);
  return (
    <>
      <AccordionItem id={header} key={index} name={contractDescription.name}>
        <AccordionContent read={read} methods={methods} />
      </AccordionItem>
    </>
  );
};

const AccordionItem = ({ name, id, ...rest }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [contractName, setContractName] = useState(name);
  const [deletey, setDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  const collection = useBonadocsStore((state) => state.collection);
  const setDeleteContract = useBonadocsStore(
    (state) => state.setDeleteContract
  );

  const latestName = deletey
    ? ""
    : collection.data.contracts.find((c) => c.id === id).name;

  useEffect(() => {
    setContractName(latestName);
  }, [latestName]);

  const toogleInput = () => {
    setShowEdit(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.60)",
    },
    content: {
      display: "grid",
      top: "40%",
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
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setShowEdit((prevState) => !prevState);
  };
  const editContract = (event) => {
    if (event.key === "Enter") {
      collection.renameContract(id, contractName);
      updateProject(collection);
      setShowEdit(!showEdit);
    }
  };

  const deleteContract = (event) => {
    try {
      setDeleteContract(id);
      setDelete(true);
      closeModal();
    } catch (err) {}
  };

  return (
    <>
      <Item
        {...rest}
        header={
          <div className="accordion__container">
            <img
              className="chevron-down"
              src={chevronDown}
              alt="Chevron Down"
            />

            {!showEdit ? (
              <h4 className="accordion__container__header">{contractName}</h4>
            ) : (
              <MethodItemInput
                editContract={editContract}
                contractName={contractName}
                setContractName={setContractName}
                toogleInput={toogleInput}
              />
            )}

            {!showEdit && (
              <h4 onClick={handleToggle} className="accordion__container__edit">
                <img src={edit} />
              </h4>
            )}

            {
              <h4
                onClick={() => openModal()}
                className="accordion__container__delete"
              >
                <img src={trash} />
              </h4>
            }
          </div>
        }
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contract Modal"
      >
        <div className="modal__close" onClick={closeModal}>
          <img className="modal__close__img" src={close} />
        </div>
        <div className="modal__container">
          <>
            <h3 className="modal__title">Delete Contract</h3>
            <h4 className="modal__description">
              Are you sure you want to delete contract: {name}
            </h4>
            <button
              onClick={() => {
                deleteContract();
              }}
              className="contract__page__info__button"
            >
              Delete Project
            </button>
          </>
        </div>
      </Modal>
    </>
  );
};
