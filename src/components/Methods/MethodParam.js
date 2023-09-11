import { useBonadocsStore } from "../../store";
import { useState, useEffect } from "react";
import { useEthersSigner } from "../../ethers";
import { validate, validateParams } from "../../utils/validate";
import { toast } from "react-toastify";
import { TextInput } from "../Input/TextInput";
import { Collection } from "@bonadocs/core";
import plusBlue from "../../image/plus-blue.svg";
import close from "../../image/close.svg";
import docsClose from "../../image/document-close.svg";
import docsOpen from "../../image/document-open.svg";
import clsx from "clsx";
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
        getCurrentMethod[1].inputDataKey,
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
    collection.updateString({
      key: getCurrentMethod[1].inputDataKey,
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
      let generatedCount = Number(collection.getString(dataKey, paramPath));
      if (isNaN(generatedCount) || generatedCount < 1) {
        generatedCount = 1;
      }
      generatedCount =
        param.arrayLength === -1 ? generatedCount : param.arrayLength;
      collection.updateString({
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
      const data = collection.getString(
        getCurrentMethod[1].inputDataKey,
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
      console.log(getCurrentMethod);
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
            contractId: method.contract,
            data,
            overrides: { value: payable },
          },
          { jsonResult: true }
        );
        console.log(res);

        setCurrentResult(res);
        setShowResult(true);
      } else {
        console.log({ contractName: method, data });
        res = await collection.runFunction(
          {
            contractId: method.contract,
            data,
          },
          { jsonResult: true }
        );

        console.log(res);
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
    const prevGeneratedCount = Number(
      collection.getString(functionDataKey, arrayDefinition.path)
    );

    let generatedCount = countToAdd + prevGeneratedCount;

    if (generatedCount < 1) {
      generatedCount = 1;
    }
    collection.updateString({
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
    for (let i = 0; i < elementDisplaySegments.length; i++) {
      elementDisplaySegments[i].index += arrayDefinitionIndex;
      elementDisplaySegments[i].arrayIndex = arrayDefinitionIndex;
    }
    paramSegments.splice(
      arrayDefinitionIndex,
      1 + elementsPerItem * prevGeneratedCount,
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
    indexToDelete,
    docKey
  ) {
    console.log("id", contractName);
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
      collection.getString(functionDataKey, arrayDefinition.path)
    );
    console.log("generatedcount", generatedCount);
    for (let i = indexToDelete; i < generatedCount; i++) {
      if (i === generatedCount - 1) {
        collection.deleteEntireSubPath(
          functionDataKey,
          arrayDefinition.path + "." + i
        );

        collection.deleteEntireSubPath(
          docKey,
          arrayDefinition.path + "." + i
        );
      } else {
        collection.replaceEntireSubPath(
          functionDataKey,
          arrayDefinition.path + "." + (i + 1),
          arrayDefinition.path + "." + i,
          false
        );

        collection.replaceEntireSubPath(
          docKey,
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
          <h3 className="method__parameters__title lead">Params</h3>
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
                <ParamsList
                  addArrayItem={addArrayItem}
                  result={result}
                  collection={collection}
                  method={getCurrentMethod[1]}
                  key={i}
                  name={name}
                  index={index}
                  baseType={baseType}
                  indent={indent}
                  arrayIndex={arrayIndex}
                  arrayPath={arrayPath}
                  path={path}
                  indexInArray={indexInArray}
                  handleInputChange={handleInputChange}
                  deleteAtSpecificIndex={deleteAtSpecificIndex}
                />
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
      <div className="method__item__query">
        <button className="method__item__button" onClick={() => queryMethod()}>
          Query {getCurrentMethod[1].name}
        </button>
      </div>

      {/* <button onClick={async () => console.log(await collection.save())}>
        save
      </button>
      <button
        onClick={async () => {

          console.log(
            await Collection.fromIpfs(
              "ipfs://bafkreiaxcv4mzwjj2u4ykze4iy6j6mogbqkptqap5ksnxxcc5o5ioxausa"
            )
          );
        }}
      >
        retreive
      </button> */}
    </div>
  );
};

export const ParamsList = ({
  name,
  index,
  baseType,
  indent,
  arrayIndex,
  arrayPath,
  path,
  indexInArray,
  i,
  method,
  collection,
  result,
  addArrayItem,
  handleInputChange,
  deleteAtSpecificIndex,
}) => {
  const [showDocs, setShowDocs] = useState(true);
  return (
    <div
      className={clsx(
        indent === 0 && "method__parameters__item",
        i === 0 && "bt-0"
      )}
      style={{ marginLeft: `${indent * 1.4}rem` }}
    >
      <h3 key={i} className={clsx("method__parameters__name")}>
        {!showDocs ? (
          <img  onClick={() => setShowDocs(!showDocs)} src={docsClose} />
        ) : (
          <img onClick={() => setShowDocs(!showDocs)} src={docsOpen} />
        )}
        {name} ({baseType})
        {baseType !== "tuple" &&
          baseType !== "array" &&
          baseType !== "bool" && (
            <TextInput
              dataKey={method.inputDataKey}
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
            className="method__parameters__button"
            onClick={() =>
              addArrayItem(
                collection,
                method.contract,
                method.inputDataKey,
                result,
                index
              )
            }
          >
            <img src={plusBlue} />
            Add array property
          </button>
        )}
        {arrayPath && (
          <button
            className="method__parameters__button__remove"
            onClick={() => {
              deleteAtSpecificIndex(
                collection,
                method.contract,
                method.inputDataKey,
                result,
                arrayIndex,
                indexInArray,
                method.docKey
              );
            }}
          >
            <img src={close} />
          </button>
        )}
      </h3>

      {
       showDocs && <TextInput
        dataKey={method.docKey}
        className="method__parameters__input__docs"
        path={path}
        name={name}
        baseType={baseType}
        collection={collection}
        docs={true}
      />
     } 
    </div>
  );
};
