import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../../image/chevron-down.svg";
import { useState, useEffect } from "react";
import { AccordionContent } from "../Accordion/AccordionContent";
import { Collection } from "@bonadocs/core";
import { useBonadocsStore } from "../../store";
import { groupByContract } from "../../utils/contractGrouping";
import refresh from "../../image/refresh.svg";
import clsx from "clsx";
import { MethodItem2 } from "../Methods/MethodItem2";
import { useNavigate } from "react-router";

export const ActionList = ({ className }) => {
  const [read, setRead] = useState(true);
  const [contracts, setContracts] = useState({});
  const navigate = useNavigate();
  const collection = useBonadocsStore((state) => state.collection);
  const latestContract = useBonadocsStore((state) => state.latestContract);
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  useEffect(() => {
    if (!collection) {
      return;
    }
    setContracts(groupByContract(Array.from(collection.displayData)));
  }, [latestContract]);

  
  return (
    <div className={className}>
      <div className="method__list__container">
        <h3 className="method__list__container__name">Actions</h3>

        <div className="method__list__container__contracts">
          <div className="method__list__container__contracts__select">
            <div className="method__list__container__contracts__select__title">
              <h3>All Actions</h3>
              <img alt="refresh" onClick={() => navigate(0)} src={refresh} />
            </div>
            {Object.keys(contracts).length > 0 && (
              <Accordion>
                {Object.keys(contracts).map((key) => (
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
      </div>
    }
  />
);
