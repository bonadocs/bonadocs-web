import { ActionItem } from "./ActionItem";
import { ActionList } from "./ActionList";

export const ActionWrapper = () => {
  return (
    <>
      <ActionList className="editor__wrapper__list" />
      <ActionItem />
    </>
  );
};
