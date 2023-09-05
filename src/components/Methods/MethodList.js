import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../../image/chevron-down.svg";
import { useState, useEffect } from "react";
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

export const MethodList = ({ className }) => {
  const [read, setRead] = useState(true);
  const [contracts, setContracts] = useState({});
  const collection = useBonadocsStore((state) => state.collection);
  const latestContract = useBonadocsStore((state) => state.latestContract);
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const navigate = useNavigate();

  useEffect(() => {
    if (!collection) {
      return;
    }
    console.log(collection.displayData.size);
    setContracts(groupByContract(Array.from(collection.displayData)));
  }, [latestContract]);
  return (
    <div className={className}>
      <div className="method__list__container">
        <h3 className="method__list__container__name">
          {collection._data.name} (Project name)
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
            {Object.keys(contracts).length > 0 && (
              <Accordion>
                {Object.keys(contracts).map((key) => (
                  //<option value={key}>{key}</option>
                  <AccordionItem key={key} header={key}>
                    <AccordionContent read={read} methods={contracts[key]} />
                  </AccordionItem>
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

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <div className="accordion__container">
        <img className="chevron-down" src={chevronDown} alt="Chevron Down" />
        <h4 className="accordion__container__header">{header}</h4>
        <h4 className="accordion__container__edit">
          <img src={edit} />
        </h4>
        <h4 className="accordion__container__delete">
          <img src={trash} />
        </h4>
      </div>
    }
  />
);
