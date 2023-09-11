import { useState } from "react";
import { Collection } from "@bonadocs/core";
import { useBonadocsStore } from "../store";
import { history } from "../_helpers/history";
import { toast } from "react-toastify";
import { Bars } from "react-loading-icons";

export const AddLink = ({ className }) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const updateProject = useBonadocsStore((state) => state.updateProject);
  const setCurrentMethod = useBonadocsStore((state) => state.setCurrentMethod);
  return (
    <div className={className}>
      <div className="contract__page__info__section">
        <h3>Open existing</h3>
        <h5 className="contract__page__info__section__sub">
          Paste the link to the project to continue.
        </h5>

        <input
          className="contract__page__info__input"
          label="Project name"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="text"
          placeholder="input link"
        />
        <button
          onClick={async () => {
            try {
              setLoading(true);
              const collection = await Collection.fromIpfs(link);
              
              updateProject(collection);
              setCurrentMethod(null);
              history.navigate("/editor/method");
              setLoading(false);
            } catch (err) {
              setLoading(false);
              toast.error("Unable to load collection");
            }
          }}
          className="contract__page__info__button ml-auto"
        >
          {loading ? <Bars className="loader__bars" /> : <>Open Link</>}
        </button>
      </div>
    </div>
  );
};
