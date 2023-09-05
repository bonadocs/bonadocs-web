import { ActionItem } from "../Actions/ActionItem";
import { ActionList } from "../Actions/ActionList";

export const ActionWrapper = () => {
  return (
    <>
      <ActionList className="editor__wrapper__list" />
      <ActionItem />
    </>
  );
};
