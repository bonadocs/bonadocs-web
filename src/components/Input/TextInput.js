import { useState, useEffect } from "react";
import { useBonadocsStore } from "../../store";
export const TextInput = ({
  collection,
  contractName,
  dataKey,
  name,
  baseType,
  path,
  className
}) => {
  const [, setText] = useState("");
  const value = collection.getValue(contractName, dataKey, path);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  if (value == null) {
    collection.updateValue(contractName, {
      key: dataKey,
      subPath: path,
      value: "",
    });
    updateProject(collection);
  }

  return (
    <input
      placeholder={name ? name : baseType}
      value={value || ""}
      className={className}
      onChange={(event) => {
        collection.updateValue(contractName, {
          key: dataKey,
          subPath: path,
          value: event.target.value,
        });
        updateProject(collection);
        setText(event.target.value);
      }}
    />
  );
};
