import { useState, useEffect } from "react";
import { useBonadocsStore } from "../../store";
export const TextInput = ({
  collection,
  contractName,
  docKey,
  dataKey,
  name,
  baseType,
  path,
  className,
  docs = false,
}) => {
  const [, setText] = useState("");
  const value = collection.getString(dataKey, path);
  const docValue = collection.getString(docKey, path);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  if (value == null) {
    collection.updateString({
      key: dataKey,
      subPath: path,
      value: "",
    });
    console.log(collection);
    updateProject(collection);
  }

  return (
    <>
      <input
        placeholder={
          name ? `${name} ${docs && "docs"}` : `${baseType} ${docs && "docs"}`
        }
        value={value || ""}
        className={className}
        onChange={(event) => {
          collection.updateString({
            key: dataKey,
            subPath: path,
            value: event.target.value,
          });
          console.log(collection);
          updateProject(collection);
          setText(event.target.value);
        }}
      />
      {/* 
      <input
        placeholder={name ? `${name} documentation` : baseType}
        value={docValue || ""}
        className={className}
        onChange={(event) => {
          collection.updateString({
            key: docKey,
            subPath: path,
            value: event.target.value,
          });
          console.log(collection);
          updateProject(collection);
          setText(event.target.value);
        }}
      /> */}
    </>
  );
};
