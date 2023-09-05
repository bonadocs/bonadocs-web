import { useState } from "react";
import { chains } from "../../data/chains";
import { useBonadocsStore } from "../../store/index";
import { validate } from "../../utils/validate";
import "react-toastify/dist/ReactToastify.css";

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
  const initiateProject = useBonadocsStore((state) => state.initiateProject);
  const addContract = useBonadocsStore((state) => state.addContract);

  const submitProject = async () => {
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
    } else {
      projectValidated =
        checked !== true
          ? validate({ ...requiredProject, abi })
          : validate({ ...requiredProject });
      console.log(projectValidated);
      console.log("contract");
      if (projectValidated) {
        const close = await addContract(
          project.contractName,
          jsonRpcUrl,
          project.contractAddress,
          project.network,
          project.abi,
          checked
        );
        console.log(close);
        close && closeModal();
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
          <option value="" disabled selected>
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
      <tr className="contract__page__info__text">
        <td>
          <input
            value="true"
            onChange={() => setChecked(true)}
            checked={checked === true}
            id="Radio1"
            type="radio"
            name="verification"
          />
          <span onClick={() => setChecked(true)} class="graphical-radio"></span>
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
            class="graphical-radio"
            onClick={() => setChecked(false)}
          ></span>
          <span>No, it's not</span>
        </td>
      </tr>
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
          submitProject();
        }}
        className="contract__page__info__button"
      >
        {newProject ? `Initiate Project` : `Add Contract`}
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
