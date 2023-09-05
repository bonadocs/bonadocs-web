export const AddAction = ({ closeModal }) => {
  return (
    <>
      <div className="contract__page__info__section">
        <h3 className="modal__title">Add Action</h3>
        <input
          className="contract__page__info__input mt"
          label="Action name"
          // value={project.contractName}
          // onChange={(e) =>
          //   setProject({ ...project, contractName: e.target.value })
          // }
          type="text"
          placeholder="Action name"
        />
      </div>

      <button onClick={() => {}} className="contract__page__info__button">
        Add Action
      </button>
    </>
  );
};
