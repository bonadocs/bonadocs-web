import { useBonadocsStore } from "../../store";
import { useEffect, useState } from "react";
import { MethodHeader } from "./MethodHeader";
import edit from "../../image/edit.svg";
import { MethodDescriptionEdit } from "./MethodDescriptionEdit";
import { chains } from "../../data/chains";
export const MethodResult = () => {
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const currentResult = useBonadocsStore((state) => state.currentResult);
  const showResult = useBonadocsStore((state) => state.showResult);
  const collection = useBonadocsStore((state) => state.collection);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const updateProject = useBonadocsStore((state) => state.updateProject);
  useEffect(() => {
    setContractDescription("");
    if (getCurrentMethod) {
      let chain;
      console.log(collection.data.contracts);
      collection.data.contracts.forEach((item) => {
        if (getCurrentMethod[1].contract === item.id) {
          if (typeof item.docs === "string") {
            setContractDescription(item);
            setDescription(item.docs);
            chain = item;
          }
        }
      });
      console.log(chain);
      if (chain) {
        const s = chains.find(
        ([key, value]) => key == chain.chainCode
      );
      if (s) {
        setCurrentNetwork(s[1].chain);
        console.log(currentNetwork);
      }
      }
      
    }
  }, [getCurrentMethod]);

  const updateDocumentaion = () => {
    collection.data.contracts.find(
      (c) => c.id === getCurrentMethod[1].contract
    ).docs = description;
    setIsOpen(false);
    updateProject(collection);
  };

  return (
    <div>
      <MethodHeader />
      <div className="method__title">Method Response</div>

      <div>
        {showResult && (
          <>
            <div>
              {currentResult.length && (
                <>
                  <div>
                    {currentResult.map((res, index) => {
                      return (
                        <div key={index} className="method__result">
                          <div className="method__result__name">
                            {res.name ? (
                              <h3>{res.name}: </h3>
                            ) : (
                              <h3>value{index}</h3>
                            )}
                          </div>
                          <div className="method__result__value">
                            {String(res.value)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {getCurrentMethod && (
        <>
          {true && (
            <div className="method__title bt-1 mt-5">
              <>
                {`${contractDescription.name} description ( network: ${currentNetwork})`}
                <img
                  onClick={() => setIsOpen(true)}
                  className="method__title__edit"
                  src={edit}
                />
              </>
            </div>
          )}

          <div className="contract__description">
            {contractDescription.docs}
          </div>
          <MethodDescriptionEdit isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="contract__page__info__section">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="contract__page__info__input description__height "
                placeholder=""
              ></textarea>
            </div>
            <button
              onClick={() => {
                updateDocumentaion();
              }}
              className="contract__description__button"
            >
              Save
              {/* {loading ? <Bars className="loader__bars" /> : <>Add Variable</>} */}
            </button>
          </MethodDescriptionEdit>
        </>
      )}
    </div>
  );
};
