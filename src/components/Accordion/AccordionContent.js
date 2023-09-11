import { useState, useEffect, useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import { useBonadocsStore } from "../../store";
import { Tooltip } from "react-tooltip";

export const AccordionContent = ({ methods, read }) => {
  useEffect(() => {
    setContractMethod(methods);
    console.log(read);
  }, []);
  const [contractMethod, setContractMethod] = useState([]);
  const ref = useRef(null);
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const setCurrentMethod = useBonadocsStore((state) => state.setCurrentMethod);
  const active = (method) => {
    if (getCurrentMethod) {
      return getCurrentMethod[1].name === method;
    } else return false;
  };

  // const isEllipsisActive = (e) => {
  //   return e.offsetWidth < e.scrollWidth;
  // };

  return (
    <>
      {contractMethod.length > 0 && (
        <div className="accordion__content__container">
          {read ? (
            <div className="accordion__wrapper">
              {contractMethod
                .filter((item, index) => {
                  return item[1].constant && item[1].type !== "event";
                })
                .map((item, index) => (
                  <div key={index} className="accordion__item__wrapper">
                    <a
                      data-tooltip-id={`my-tooltip-inline${index}`}
                      data-tooltip-content={`${item[1].name}`}
                    >
                      <h3
                        ref={ref}
                        onClick={() => {
                          setCurrentMethod(item);
                         
                        }}
                        className={clsx(
                          active(item[1].name) && "accordion__item__active",
                          "accordion__item"
                        )}
                      >
                        {item[1].name}
                      </h3>
                    </a>
                    {item[1].name.length >= 18 && (
                      <Tooltip
                        id={`my-tooltip-inline${index}`}
                        style={{
                          backgroundColor: "#F1F5F9",
                          color: "#475569",
                        }}
                        noArrow={true}
                        opacity={1}
                      />
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {contractMethod
                .filter((item, index) => {
                  return !item[1].constant && item[1].type !== "event";
                })
                .map((item, index) => (
                  <div key={index} className="accordion__item__wrapper">
                    <a
                      data-tooltip-id={`my-tooltip-inline${index}`}
                      data-tooltip-content={`${item[1].name}`}
                    >
                      <h3
                        ref={ref}
                        onClick={() => {
                          setCurrentMethod(item);
                         
                        }}
                        key={index}
                        className={clsx(
                          active(item[1].name) && "accordion__item__active",
                          "accordion__item"
                        )}
                      >
                        {item[1].name}
                      </h3>
                    </a>
                    {item[1].name.length >= 18 && (
                      <Tooltip
                        id={`my-tooltip-inline${index}`}
                        style={{
                          backgroundColor: "#F1F5F9",
                          color: "#475569",
                        }}
                        noArrow={true}
                        opacity={1}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
