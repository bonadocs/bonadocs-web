import { ActionHeader } from "../components/Actions/ActionHeader";
import plus from "../image/plus-color.svg";
import menu from "../image/menu.svg";

export const Variable = () => {
  return (
    <>
      <div className="variable">
        <h3 className="variable__title">Variables</h3>
        <div className="variable__subtitle">
          All variables
          <h4 className="variable__add">
            <img className="contract__utils__button__img" src={plus} />
            Add variable
          </h4>
        </div>

        <div className="variable__table">
          <div className="variable__table__header">
            <h3 className="variable__table__header__item">Name</h3>
            <h3 className="variable__table__header__item">Initial Value</h3>
            <h3 className="variable__table__header__item">Sync value</h3>
            <h3 className="variable__table__header__action">Action</h3>
          </div>
          <div className="variable__table__item">
            <h4 className="variable__table__item__indi">value0</h4>
            <input
              className="variable__table__item__input"
              value="E4T9FGJEWRT"
            />
            <input
              className="variable__table__item__input"
              
            />
            <img src={menu} />
          </div>
        </div>
      </div>
      <ActionHeader />
    </>
  );
};
