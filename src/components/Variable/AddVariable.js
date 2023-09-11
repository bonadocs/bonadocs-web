import { VariableModal } from "./VariableModal";
import { useState } from "react";
import { useBonadocsStore } from "../../store";
import { toast } from "react-toastify";
import { Bars } from "react-loading-icons";

export const AddVariable = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialVariable, setInitialVariable] = useState("");
  const [syncedVariable, setSyncedVariable] = useState("");
  const collection = useBonadocsStore((state) => state.collection);
  const updateProject = useBonadocsStore((state) => state.updateProject);

    const addVariable = () => {
        
    try {
    
        if (name && initialVariable && syncedVariable) {
          setLoading(true);
        const existingVariable = collection.data.variables.find(
          (variable) => variable.name === name
        );
        if (existingVariable) {
          toast.error(`Variable already exists`);
          return;
        }
        collection.addCollectionVariable({
          name,
          localValue: initialVariable,
          syncedValue: syncedVariable,
        });
        updateProject(collection);
        console.log(collection);
        setIsOpen(!isOpen);
          toast.success(`Variable succcesfully added`);
          setLoading(false);
        setName("");
        setInitialVariable("");
        setSyncedVariable("");
      }
      
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };
  return (
    <VariableModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h3 className="modal__title">Add Variable</h3>
      <div className="contract__page__info__section">
        <input
          className="contract__page__info__input"
          label="Variable name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Variable name"
        />
      </div>
      <div className="contract__page__info__section">
        <input
          className="contract__page__info__input"
          label="Initial value"
          value={initialVariable}
          onChange={(e) => {
            setInitialVariable(e.target.value);
          }}
          type="text"
          placeholder="Initial value"
        />
      </div>
      <div className="contract__page__info__section">
        <input
          className="contract__page__info__input"
          label="Contract name"
          value={syncedVariable}
          onChange={(e) => {
            setSyncedVariable(e.target.value);
          }}
          type="text"
          placeholder="Synced value"
        />
      </div>
      <button
        disabled={loading}
        onClick={() => {
          addVariable();
        }}
        className="contract__page__info__button"
      >
        {loading ? <Bars className="loader__bars" /> : <>Add Variable</>}
      </button>
    </VariableModal>
  );
};
