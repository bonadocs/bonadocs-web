import { useEffect, useState, useRef } from "react";
import { chains } from "../../data/chains";
import { useBonadocsStore } from "../../store/index";
import { validate } from "../../utils/validate";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loading-icons";

export const AddContract = ({
  projectName,
  title,
  newProject = true,
  closeModal,
}) => {
  const [checked, setChecked] = useState(false);
  const [project, setProject] = useState({
    contractName: "",
    description: "",
    jsonRpcUrl: chains[0][1].jsonRpcUrl,
    contractAddress: "",
    network: chains[0][0],
    abi: "",
  });
  const setCurrentMethod = useBonadocsStore((state) => state.setCurrentMethod);
  const initiateProject = useBonadocsStore((state) => state.initiateProject);
  const addContract = useBonadocsStore((state) => state.addContract);
  const loadingRef = useRef()
  const submitProject = async () => {
     loadingRef.current = true
          console.log(loadingRef.current);
    let jsonRpcUrl, projectValidated;
    chains.map(([key, value]) => {
      if (key === project.network) {
        jsonRpcUrl = value.jsonRpcUrl;
      }
    });

    const { abi, ...requiredProject } = project;
    if (newProject !== false) {
      projectValidated =
        checked !== true
          ? validate({ ...requiredProject, abi, projectName })
          : validate({ ...requiredProject, projectName });
      console.log(projectValidated);
      console.log("project");
      !projectValidated && ( loadingRef.current = false )
      projectValidated &&
        initiateProject(
          projectName,
          project.contractName,
          project.description,
          jsonRpcUrl,
          project.contractAddress,
          project.network,
          project.abi,
          checked
        );
      setCurrentMethod(null)
       loadingRef.current = false; 
    } else {
      projectValidated =
        checked !== true
          ? validate({ ...requiredProject, abi })
          : validate({ ...requiredProject });
      console.log(projectValidated);
      console.log("contract");
      !projectValidated && (loadingRef.current = false);
      if (projectValidated) {
        const close = await addContract(
          project.contractName,
          jsonRpcUrl,
          project.contractAddress,
          project.network,
          project.abi,
          checked,
          project.description
        );
        console.log(close);
        close && closeModal();
        loadingRef.current = false;
      }
    }

    // navigate("/editor");
  };
  return (
    <>
      <div className="contract__page__info__section">
        {/* <h2 className="contract__page__info__section__title">{title}</h2> */}

        <input
          className="contract__page__info__input"
          label="Contract name"
          value={project.contractName}
          onChange={(e) =>
            setProject({ ...project, contractName: e.target.value })
          }
          type="text"
          placeholder="Contract name"
        />
      </div>
      <div className="contract__page__info__section">
        <input
          className="contract__page__info__input"
          label="Description"
          type="text"
          required
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="Describe the functionality"
        />
      </div>
      <div className="contract__page__info__section">
        <input
          className="contract__page__info__input"
          label="Contract address"
          type="text"
          value={project.contractAddress}
          onChange={(e) =>
            setProject({ ...project, contractAddress: e.target.value })
          }
          placeholder="Contract address"
        />
      </div>
      <div className="contract__page__info__section">
        <select
          onChange={(e) => setProject({ ...project, network: e.target.value })}
          className="contract__page__info__input__select"
          id="networks"
        >
          <option value="" selected disabled>
            Select your network
          </option>
          {chains.map(([key, value]) => (
            <option key={value.chainId} value={key}>
              {value.chain}
            </option>
          ))}
        </select>
      </div>
      <h3>Is this contract verified?</h3>
      <div className="contract__page__info__text">
        <div>
          <input
            value="true"
            onChange={() => setChecked(true)}
            checked={checked === true}
            id="Radio1"
            type="radio"
            name="verification"
          />
          <span
            onClick={() => setChecked(true)}
            className="graphical-radio"
          ></span>
          <span>Yes, it's verified</span>
          <input
            onChange={() => setChecked(false)}
            checked={checked === false}
            value="false"
            id="Radio2"
            type="radio"
            name="verification"
          />
          <span
            className="graphical-radio"
            onClick={() => setChecked(false)}
          ></span>
          <span>No, it's not</span>
        </div>
      </div>
      <p className="contract__page__info__text">
        If unverified, select "No" and you get to input your ABI manually.
      </p>

      <hr />

      {!checked && (
        <div className="contract__page__info__section__area__container">
          <h5>Paste your ABI</h5>
          <textarea
            value={project.abi}
            onChange={(e) => setProject({ ...project, abi: e.target.value })}
            className="contract__page__info__input"
          ></textarea>
        </div>
      )}

      <button
        onClick={() => {
          loadingRef.current = true
          console.log(loadingRef.current);
          submitProject();
        }}
        disabled={loadingRef.current}
        className="contract__page__info__button"
      >
        {!loadingRef.current ? (
          <Bars className="loader__bars" />
        ) : (
          <>{newProject ? `Initiate Project` : `Add Contract`}</>
        )}
      </button>

      {/* {!newProject && (
        
        <button
          className="contract__page__info__button"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      )} */}
    </>
  );
};
