import { persist } from "zustand/middleware";
import { useBonadocsStore } from "../index";
import { Collection } from "@bonadocs/core";
import { toast } from "react-toastify";

export const collectionStore = (set, get) => ({
  currentMethod: null,
  latestContract: null,
  currentResult: null,
  showResult: false,
  setLastestResult: (result) => set(() => ({ latestContract: result })),
  setCurrentResult: (result) => set(() => ({ currentResult: result })),
  setShowResult: (show) => set(() => ({ showResult: show })),
  setCurrentMethod: (method) => {
    set(() => ({ currentMethod: method }))
    if (method == null) {
      window.localStorage.removeItem("current");
    }
    window.localStorage.setItem("current", JSON.stringify(method));
  },
  setDeleteContract: (id) => {
    try {
      useBonadocsStore.getState().collection.removeContract(id);
      useBonadocsStore
        .getState()
        .updateProject(useBonadocsStore.getState().collection);
      
      toast.success(`Contract deleted`);
      set({
        latestContract: "",
      });
      // const available = useBonadocsStore
      //   .getState()
      //   .collection.data.contracts.find(
      //     (item) => item.id === get().currentMethod[1].contract
      // );

      if (id === get().currentMethod[1].contract) {
        get().setCurrentMethod(null)
      }
        
    } catch (err) {
      toast(err);
    }
  },
  addContract: async (
    contractName,
    jsonRpcUrl,
    address,
    chainId,
    abi,
    verified,
    docs
  ) => {
    try {
      const contractAbi =
        verified !== true
          ? abi
          : await useBonadocsStore.getState().readContract(address, chainId);
      console.log(contractAbi);
      if (contractAbi) {
        console.log({
          name: contractName,
          address,
          chainCode: chainId,
          jsonRpcUrl: jsonRpcUrl,
          spec: contractAbi,
          docs,
        });
        useBonadocsStore.getState().collection.addContract({
          name: contractName,
          address,
          chainCode: chainId,
          jsonRpcUrl: jsonRpcUrl,
          spec: contractAbi,
          docs,
          inputData: {},
        });
        useBonadocsStore
          .getState()
          .updateProject(useBonadocsStore.getState().collection);
        set({
          latestContract: contractName,
        });
        toast.success(`Contract succcesfully added`);
        return true;
      }
    } catch (err) {
      toast(`Confirm your ${err}`);
    }
  },
});
