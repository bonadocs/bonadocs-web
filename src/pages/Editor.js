import { Sidebar } from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const Editor = () => {
  return (
    <div className="editor__wrapper">
      <Sidebar className="editor__wrapper__sidebar" />
      <Outlet />
    </div>
  );
};
