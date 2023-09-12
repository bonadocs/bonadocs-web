import { useState } from "react";
import { AddContract } from "../components/Setup/AddContract";
import logo from "../image/logo.svg";
import clsx from "clsx";
import { AddLink } from "../link/AddLink";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBonadocsStore } from "../store";
export const SetupScreen = () => {
  const navigate = useNavigate()
  const collection = useBonadocsStore((state) => state.collection);
  const [project, setProject] = useState("");

  const [status, setStatus] = useState(true);
  useEffect((() => {
    collection && navigate('/editor/method');
    return () => {};
  
  }), [])
  return (
    <div className="contract__page">
      <div className="contract__page__navbar">
        <img className="contract__page__navbar__logo" src={logo} />
      </div>

      <div className="contract__page__header">
        <div
          onClick={() => setStatus(true)}
          className={clsx(
            "contract__page__header__item",
            status && "contract__page__header__item__active"
          )}
        >
          New Project
        </div>
        <div
          onClick={() => setStatus(false)}
          className={clsx(
            "contract__page__header__item",
            !status && "contract__page__header__item__active"
          )}
        >
          Open Project
        </div>
      </div>

      {status ? (
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
      ) : (
        <AddLink className={"contract__page__info"} />
      )}
    </div>
  );
};
