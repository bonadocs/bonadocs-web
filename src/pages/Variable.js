import { ActionHeader } from "../components/Actions/ActionHeader";
import plus from "../image/plus-color.svg";
import trash from "../image/trash.svg";
import { VariableModal } from "../components/Variable/VariableModal";
import { useState, useEffect } from "react";
import { AddVariable } from "../components/Variable/AddVariable";
import { useBonadocsStore } from "../store";
import { Collection } from "@bonadocs/core";

export const Variable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const collection = useBonadocsStore((state) => state.collection);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  const [values, setValues] = useState(collection.data.variables);
  console.log(JSON.stringify(collection.data.variables));

  const edit = (e, index) => {
    collection.data.variables[index].syncedValue = e.target.value;
    collection.data.variables[index].localValue = e.target.value;
    // values[index].syncedValue = e.target.value;
    // values[index].localValue = e.target.value;
    setValues([...collection.data.variables]);
    updateProject(collection);
  };

  const deleteVariable = (localCollection, index) => {
    // values.splice(index, 1);
     collection.data.variables.splice(index, 1);
    setValues([...collection.data.variables]);
    updateProject(collection);
  };

  useEffect(() => setValues([...collection.data.variables]),[collection.data.variables]);

  return (
    <>
      <div className="variable">
        <h3 className="variable__title">Variables</h3>
        <div className="variable__subtitle">
          All variables
          <h4 onClick={() => setIsOpen(true)} className="variable__add">
            <img className="contract__utils__button__img" src={plus} />
            Add variable
          </h4>
        </div>

        <div className="variable__table">
          <div className="variable__table__header">
            <h3 className="variable__table__header__item">Name</h3>
            <h3 className="variable__table__header__item">Value</h3>
            <h3 className="variable__table__header__action">Action</h3>
          </div>

          {values.map((variable, index) => (
            <div key={index} className="variable__table__item">
              <h4 className="variable__table__item__indi">{variable.name}</h4>

              <input
                value={variable.syncedValue}
                onChange={(e) => edit(e, index)}
                className="variable__table__item__input"
              />

              <img
                onClick={() => deleteVariable(collection.data.variables, index)}
                className="variable__table__item__image"
                src={trash}
                alt="delete variable"
              />
            </div>
          ))}
        </div>
      </div>
      <ActionHeader />
      <AddVariable isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
