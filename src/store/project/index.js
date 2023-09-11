import { Collection, loadContractSpec } from "@bonadocs/core";
import { toast } from "react-toastify";
import { history } from "../../_helpers/history";
import { persist, createJSONStorage } from "zustand/middleware";

export const projectStore = persist(
  (set, get) => ({
    collection: null,
    readContract: async (address, chainId) => {
      try {
        const responseAbi = await loadContractSpec(
          process.env.REACT_APP__LOAD,
          address,
          chainId
        );
        if (responseAbi == null) {
          toast("Confirm your contract address and network");
        }
        return responseAbi;
      } catch (error) {
        console.log(error);
        toast(`Confirm your ${error}`);
      }
    },
    updateProject: async (collection) => {
      set({
        collection,
      });
    },
    initiateProject: async (
      projectName,
      contractName,
      description,
      jsonRpcUrl,
      address,
      chainId,
      abi,
      verified
    ) => {
      try {
        const project = new Collection(projectName, description);
        const contractAbi =
          verified !== true ? abi : await get().readContract(address, chainId);
        console.log(
          verified,
          contractName,
          address,
          chainId,
          jsonRpcUrl,
          contractAbi
        );

        console.log(project);
        project.addContract({
          name: contractName,
          address,
          chainCode: chainId,
          jsonRpcUrl,
          spec: contractAbi,
          docs: description,
          inputData: {},
        });

        console.log(project);
        console.log(project.displayData);
        console.log(project.getSnapshot());
        set({
          collection: project,
        });
        console.log(Collection.fromData(project.getSnapshot()));
        history.navigate("/editor/method");
      } catch (err) {
        toast(`Confirm your ${err}`);
      }
    },
  }),
  {
    name: "collection",
    storage: {
      setItem: (name, newValue) => {
        if (name !== "collection") {
          throw new Error();
        }
        console.log("CHEAP OPERATION");
        console.log(newValue.state.collection);

        const snapshot = newValue.state.collection.getSnapshot();
        console.log();
        localStorage.setItem(name, JSON.stringify(snapshot));
      },
      getItem: async (name) => {
        if (name !== "collection") {
          throw new Error();
        }
        console.log("EXPENSIVE OPERATION");
        const str = localStorage.getItem(name);
        if (!str) {
          return null;
        }

        const collection = Collection.fromData(JSON.parse(str));
        console.log(collection.displayData);

        return {
          state: {
            collection,
          },
        };
      },
    },
  }
);
