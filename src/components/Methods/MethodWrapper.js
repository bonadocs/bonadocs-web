import { MethodResult } from "./MethodResult";
import { MethodList } from "./MethodList";
import { useEffect } from "react";


export const MethodWrapper = () => {
  return (
    <>
      <MethodList className="editor__wrapper__list" />
      <MethodResult />
    </>
  );
};
