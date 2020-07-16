import { useLocalStore } from "mobx-react";
import store from "./index";
export const useStore = function () {
  return useLocalStore(() => store);
};
