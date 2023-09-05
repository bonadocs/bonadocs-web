import { useBonadocsStore } from "../../store";
import { useState, useEffect } from "react";
import { useEthersSigner } from "../../ethers";
import { validate, validateParams } from "../../utils/validate";
import { toast } from "react-toastify";
import { TextInput } from "../Input/TextInput";

export const MethodParam = () => {
  const getCurrentMethod = useBonadocsStore((state) => state.currentMethod);
  const showResult = useBonadocsStore((state) => state.showResult);
  const setShowResult = useBonadocsStore((state) => state.setShowResult);
  const setCurrentResult = useBonadocsStore((state) => state.setCurrentResult);
  const [result, setResult] = useState([]);
  const [payable, setPayable] = useState("");
  const signer = useEthersSigner();
  const collection = useBonadocsStore((state) => state.collection);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  const values = [];

  const getParams = () => {
    setResult([]);
    const method = getCurrentMethod[1];
    getCurrentMethod[1].inputs.map((param) => {
      paramSegment(
        collection,
        getCurrentMethod[1].contract,
        getCurrentMethod[1].dataKey,
        param,
        values
      );
    });
    // console.log(values);
    // values.forEach((value) => {
    //   console.log(
    //     collection.getInputParamAtPath(
    //       method.contract,
    //       method.dataKey,
    //       value.path
    //     )
    //   );
    // });

    updateProject(collection);
    setResult(values);
    console.log(result);
  };

  var str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
  };

  const handleInputChange = (path, index, event, type = "") => {
    collection.updateValue(getCurrentMethod[1].contract, {
      key: getCurrentMethod[1].dataKey,
      subPath: path,
      value: str2bool(event.target.value),
    });
    updateProject(collection);
    //setResult(result);
    //console.log(result);
  };

  const paramSegment = (
    collection,
    contractName,
    dataKey,
    param,
    values,
    indent = 0,
    path = "",
    nameOverride = false,
    extraParams = {}
  ) => {
    const paramPath = nameOverride
      ? path
      : !path
      ? param.name
      : `${path}.${param.name}`;

    console.log(paramPath);
    if (param.components) {
      console.log(indent, param.name, param.baseType, paramPath);

      values.push({
        indent,
        index: values.length,
        name: param.name,
        baseType: param.baseType,
        path: paramPath,
        ...extraParams,
      });

      param.components.forEach((comp, index) => {
        paramSegment(
          collection,
          contractName,
          dataKey,
          comp,
          values,
          indent + 1,
          `${paramPath}.${index}`,
          true
        );
      });
      return;
    }
    if (param.arrayChildren) {
      let generatedCount = Number(
        collection.getValue(contractName, dataKey, paramPath)
      );
      if (isNaN(generatedCount) || generatedCount < 1) {
        generatedCount = 1;
      }
      generatedCount =
        param.arrayLength === -1 ? generatedCount : param.arrayLength;
      collection.updateValue(contractName, {
        key: dataKey,
        subPath: paramPath,
        value: generatedCount.toString(),
      });

      // revert back for dynamic array
      console.log(
        indent,
        param.name,
        param.baseType,
        paramPath,
        generatedCount
      );
      const arrayIndex = values.length;
      values.push({
        indent,
        index: arrayIndex,
        name: param.name,
        baseType: param.baseType,
        length: param.arrayLength,
        path: paramPath,
        ...extraParams,
      });

      for (let i = 0; i < generatedCount; i++) {
        paramSegment(
          collection,
          contractName,
          dataKey,
          param.arrayChildren,
          values,
          indent + 1,
          `${paramPath}.${i}`,
          true,
          {
            arrayPath: paramPath,
            arrayIndex: arrayIndex,
            indexInArray: i,
          }
        );
      }
      return;
    }
    console.log(indent, param.name, param.baseType, paramPath);
    // result.push({ indent, name: param.name, baseType: param.baseType });
    // param.baseType === "bool" ? true : ""
    values.push({
      indent,
      index: values.length,
      name: param.name,
      baseType: param.baseType,
      path: paramPath,
      ...extraParams,
    });
  };

  function arrayifyTree(tree) {
    if (tree.value || tree.value === false) {
      return tree.value;
    }
    return tree.children.map(function (t) {
      return arrayifyTree(t);
    });
  }

  function getFinalParams(result) {
    console.log(getCurrentMethod[1]);
    if (validateParams(validateResult()) !== true) return;
    //console.log(dataResult);
    var root = {
      children: [],
      level: -1,
    };
    root.children.push({
      parent: root,
      level: 0,
    });
    var level = 0;
    var currentNode = root.children[0];
    var isFirst = true;
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      const data = collection.getValue(
        getCurrentMethod[1].contract,
        getCurrentMethod[1].dataKey,
        item.path
      );
      if (isFirst) {
        if (data !== undefined) {
          currentNode.value = data;
        } else {
          currentNode.children = [];
        }
        isFirst = false;
        continue;
      }
      if (item.indent === level) {
        // add a sibling
        currentNode.parent.children.push({
          parent: currentNode.parent,
          level: item.indent,
        });
        currentNode = currentNode.parent.children.slice(-1)[0];
      } else if (item.indent < level) {
        // we're stepping out and back into the parent
        while (currentNode.level > item.indent) {
          currentNode = currentNode.parent;
        }
        currentNode.parent.children.push({
          parent: currentNode.parent,
          level: item.indent,
        });
        currentNode = currentNode.parent.children.slice(-1)[0];
      } else if (item.indent > level) {
        currentNode.children.push({
          parent: currentNode,
          level: item.indent,
        });
        currentNode = currentNode.children.slice(-1)[0];
      }
      if (data !== undefined) {
        currentNode.value = data;
      } else {
        currentNode.children = [];
      }
      level = item.indent;
    }
    console.log(arrayifyTree(root));
    return arrayifyTree(root);
  }

  const validateResult = () => {
    const dataResult = [];
    result.forEach((param) => {
      param.data !== undefined &&
        dataResult.push({ data: param.data, name: param.name });
    });
    console.log(dataResult);
    return dataResult;
  };
  const queryMethod = async () => {
    try {
      console.log(result);
      if (validateParams(validateResult()) !== true) return;
      console.log(getCurrentMethod[1]);
      const method = getCurrentMethod[1];
      const signature = method.fullSignature;

      const data = {
        signature,
        arguments: result.length !== 0 ? getFinalParams(result) : [],
      };

      collection.signer = signer;
      let res;
      if (method.payable) {
        if (validate({ payable }) !== true) return;
        res = await collection.runFunction(
          {
            contractName: method.contract,
            data,
            overrides: { value: payable },
          },
          { jsonResult: true }
        );
        console.log(res);

        setCurrentResult(res);
        setShowResult(true);
      } else {
        console.log({ contractName: method.contract, data });
        res = await collection.runFunction(
          {
            contractName: method.contract,
            data,
          },
          { jsonResult: true }
        );

        setCurrentResult(res);
        setShowResult(true);
      }
    } catch (err) {
      toast.error(`${err}`);
      console.log(err);
    }
  };

  function modifyArrayElements(
    collection,
    contractName,
    functionDataKey,
    paramSegments,
    arrayDefinitionIndex,
    countToAdd = 1
  ) {
    const arrayDefinition = paramSegments[arrayDefinitionIndex];
    if (!arrayDefinition) {
      throw new Error("Invalid selection for add element");
    }

    if (arrayDefinition.baseType !== "array" || arrayDefinition.length !== -1) {
      throw new Error("Selected element is not a dynamic array");
    }

    const elementDisplaySegments = [];
    const arrayInputParam = collection.getInputParamAtPath(
      contractName,
      functionDataKey,
      arrayDefinition.path
    );
    if (!arrayInputParam) {
      throw new Error("Invalid array selection");
    }
    let generatedCount =
      countToAdd +
      Number(
        collection.getValue(contractName, functionDataKey, arrayDefinition.path)
      );
    if (generatedCount < 1) {
      generatedCount = 1;
    }
    collection.updateValue(contractName, {
      key: functionDataKey,
      subPath: arrayDefinition.path,
      value: generatedCount.toString(),
    });

    paramSegment(
      collection,
      contractName,
      functionDataKey,
      arrayInputParam,
      elementDisplaySegments,
      arrayDefinition.indent,
      arrayDefinition.path.substring(0, arrayDefinition.path.lastIndexOf("."))
    );
    const elementsPerItem =
      (elementDisplaySegments.length - 1) / generatedCount;
    paramSegments.splice(
      arrayDefinitionIndex,
      1 + elementsPerItem * generatedCount,
      ...elementDisplaySegments
    );
  }

  function addArrayItem(
    collection,
    contractName,
    dataKey,
    paramSegments,
    arrayDefinitionIndex
  ) {
    modifyArrayElements(
      collection,
      contractName,
      dataKey,
      paramSegments,
      arrayDefinitionIndex
    );
    updateProject(collection);
    console.log(result);
    setResult([...result]);
  }
  function deleteAtSpecificIndex(
    collection,
    contractName,
    functionDataKey,
    paramSegments,
    arrayDefinitionIndex,
    indexToDelete
  ) {
    const arrayDefinition = paramSegments[arrayDefinitionIndex];
    if (!arrayDefinition) {
      throw new Error("Invalid selection for add element");
    }
    console.log(arrayDefinition.baseType);
    if (arrayDefinition.baseType !== "array" || arrayDefinition.length !== -1) {
      throw new Error("Selected element is not a dynamic array");
    }

    const arrayInputParam = collection.getInputParamAtPath(
      contractName,
      functionDataKey,
      arrayDefinition.path
    );
    if (!arrayInputParam) {
      throw new Error("Invalid array selection");
    }

    const generatedCount = Number(
      collection.getValue(contractName, functionDataKey, arrayDefinition.path)
    );
    for (let i = indexToDelete; i < generatedCount; i++) {
      if (i === generatedCount - 1) {
        collection.deleteEntireSubPath(
          contractName,
          functionDataKey,
          arrayDefinition.path + "." + i
        );
      } else {
        collection.replaceEntireSubPath(
          contractName,
          functionDataKey,
          arrayDefinition.path + "." + (i + 1),
          arrayDefinition.path + "." + i,
          false
        );
      }
    }
    modifyArrayElements(
      collection,
      contractName,
      functionDataKey,
      paramSegments,
      arrayDefinitionIndex,
      -1
    );

    updateProject(collection);
    console.log(result);
    setResult([...result]);
  }

  useEffect(() => {
    if (getCurrentMethod) {
      getParams();

      setCurrentResult([]);
      setShowResult(false);
    }
  }, [getCurrentMethod]);
  return (
    <div className="method__parameters">
      {result.length !== 0 && (
        <>
          <h3 className="method__parameters__title">Params</h3>
          <div>
            {result.map(
              (
                {
                  name,
                  index,
                  baseType,
                  indent,
                  arrayIndex,
                  arrayPath,
                  path,
                  indexInArray,
                },
                i
              ) => (
                <h3
                  key={i}
                  className="method__parameters__name"
                  style={{ marginLeft: `${indent * 1.4}rem` }}
                >
                  {name} ({baseType})
                  {baseType !== "tuple" &&
                    baseType !== "array" &&
                    baseType !== "bool" && (
                      <TextInput
                        contractName={getCurrentMethod[1].contract}
                        dataKey={getCurrentMethod[1].dataKey}
                        className="method__parameters__input"
                        path={path}
                        name={name}
                        baseType={baseType}
                        collection={collection}
                      />
                    )}
                  {baseType === "bool" && (
                    <select
                      className="method__parameters__select"
                      onChange={(event) =>
                        handleInputChange(path, index, event, baseType)
                      }
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  )}
                  {baseType === "array" && (
                    <button
                      onClick={() =>
                        addArrayItem(
                          collection,
                          getCurrentMethod[1].contract,
                          getCurrentMethod[1].dataKey,
                          result,
                          index
                        )
                      }
                    >
                      Add array property
                    </button>
                  )}
                  {arrayPath && (
                    <button
                      onClick={() => {
                        deleteAtSpecificIndex(
                          collection,
                          getCurrentMethod[1].contract,
                          getCurrentMethod[1].dataKey,
                          result,
                          arrayIndex,
                          indexInArray
                        );
                      }}
                    >
                      Remove Item
                    </button>
                  )}
                </h3>
              )
            )}
          </div>
        </>
      )}

      {getCurrentMethod[1].payable && (
        <div className="">
          <h3 className="method__parameters__title">Overrides</h3>
          <h3 className="method__parameters__name">
            Value
            <input
              className="method__parameters__input"
              value={payable}
              onChange={(e) => setPayable(e.target.value)}
              placeholder="value (payable)"
            />
          </h3>
        </div>
      )}
      <button className="method__item__button" onClick={() => queryMethod()}>
        Query {getCurrentMethod[1].name}
      </button>
    </div>
  );
};
