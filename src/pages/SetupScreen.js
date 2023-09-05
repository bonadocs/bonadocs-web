import { useState } from "react";
import { AddContract } from "../components/Setup/AddContract";
import logo from "../image/logo.svg";
export const SetupScreen = () => {
  const [project, setProject] = useState("");

  return (
    <div className="contract__page">
      <div className="contract__page__navbar">
        <img className="contract__page__navbar__logo" src={logo} />
      </div>

      {/* <Sidebar /> */}
      <div className="contract__page__info">
        <div className="contract__page__info__section">
          <h3>Setup Project</h3>
          <h5 className="contract__page__info__section__sub">
            Add contract details to setup your project.
          </h5>

          <input
            className="contract__page__info__input"
            label="Project name"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            type="text"
            placeholder="Project name"
          />
        </div>
        <AddContract projectName={project} />
      </div>
    </div>
  );
};
