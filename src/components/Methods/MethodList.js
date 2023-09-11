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
import { MethodListItem } from "./MethodListItem";

export const MethodList = ({ className }) => {
  const [read, setRead] = useState(true);
  const [contracts, setContracts] = useState({});
  const collection = useBonadocsStore((state) => state.collection);
  const latestContract = useBonadocsStore((state) => state.latestContract);
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const [contractDescription, setContractDescription] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!collection) {
      return;
    }
    console.log(Array.from(collection.displayData));
    setContracts(groupByContract(Array.from(collection.displayData)));
    console.log(groupByContract(Array.from(collection.displayData)));
  }, [latestContract]);
  return (
    <div className={className}>
      <div className="method__list__container">
        <h3 className="method__list__container__name">
          {collection.data.name}
        </h3>

        <div className="method__list__container__contracts">
          <div className="method__list__container__contracts__select">
            <div className="method__list__container__contracts__select__title">
              <h3>All Contracts</h3>
              <img alt="refresh" onClick={() => navigate(0)} src={refresh} />
            </div>
            <div className="method__list__container__contracts__section">
              <div
                className={clsx(
                  read &&
                    "method__list__container__contracts__section__option__active",
                  "method__list__container__contracts__section__option"
                )}
                onClick={() => setRead(true)}
              >
                <h4>Read</h4>
              </div>
              <div
                className={clsx(
                  !read &&
                    "method__list__container__contracts__section__option__active",
                  "method__list__container__contracts__section__option"
                )}
                onClick={() => setRead(false)}
              >
                <h4>Write</h4>
              </div>
            </div>
             
            {Object.keys(groupByContract(Array.from(collection.displayData)))
              .length > 0 && (
              <Accordion>
                {Object.keys(contracts).map((key, index) => (
                  <MethodListItem
                    index={index}
                    key={key}
                    header={key}
                    read={read}
                    methods={contracts[key]}
                  />
                ))}
              </Accordion>
            )}
           
          </div>
          {getCurrentMethod && <MethodItem2 />}
        </div>
      </div>
    </div>
  );
};
