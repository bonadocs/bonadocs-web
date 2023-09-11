import { Collection, loadContractSpec } from "@bonadocs/core";
import { toast } from "react-toastify";
import { history } from "../../_helpers/history";
import { persist, createJSONStorage } from "zustand/middleware";

export const projectStore = persist(
  (set, get) => ({
    collection: null,
    readContract: async (address, chainId) => {
      let responseAbi;
      try {
        const responseAbi = await loadContractSpec(
          process.env.REACT_APP__LOAD,
          address,
          chainId
        );

        if (responseAbi == null) {
          toast("dge")
        }
        
      } catch (error) {
       
        toast(`Confirm your Cannot retrieve verified contract. ${error}`);
      }
      return responseAbi;
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
      const contractAbi =
        verified !== true ? abi : await get().readContract(address, chainId);
      try {
        const project = new Collection(projectName, description);
        

        
        project.addContract({
          name: contractName,
          address,
          chainCode: chainId,
          jsonRpcUrl,
          spec: contractAbi,
          docs: description,
          inputData: {},
        });

        
        set({
          collection: project,
        });
        
        history.navigate("/editor/method");
      } catch (err) {
        toast(
          `${
            contractAbi === undefined
              ? "Cannot retrieve verified contract. Try adding your ABI manually."
              : err
          }`
        );
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
       

        const snapshot = newValue.state.collection.getSnapshot();
       
        localStorage.setItem(name, JSON.stringify(snapshot));
      },
      getItem: async (name) => {
        if (name !== "collection") {
          throw new Error();
        }
       
        const str = localStorage.getItem(name);
        if (!str) {
          return null;
        }

        const collection = Collection.fromData(JSON.parse(str));
        

        return {
          state: {
            collection,
          },
        };
      },
    },
  }
);
