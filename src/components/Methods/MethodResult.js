import { useBonadocsStore } from "../../store";
import { useEffect } from "react";
import { MethodHeader } from "./MethodHeader";

export const MethodResult = () => {
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const currentResult = useBonadocsStore((state) => state.currentResult);
  const showResult = useBonadocsStore((state) => state.showResult);

  useEffect(() => {
    if (getCurrentMethod) {
      //getParams();
      // setFeedback([]);
      // setFeedbackBool(false);
      console.log(currentResult);
    }
  }, [getCurrentMethod]);

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
                        <div className="method__result">
                          <div className="method__result__name">
                            {res.name ? (
                              <h3>{res.name}: </h3>
                            ) : (
                              <h3>value{index}</h3>
                            )}
                          </div>
                          <div className="method__result__value">
                            {res.value}
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
    </div>
  );
};
