import { create } from "zustand";
import { projectStore } from "./project";
import { collectionStore } from "./collection";

export const useBonadocsStore = create((...params) => ({
  ...projectStore(...params),
  ...collectionStore(...params),
}));
