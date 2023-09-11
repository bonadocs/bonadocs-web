import { useDetectClickOutside } from "react-detect-click-outside";
export const MethodItemInput = ({
  toogleInput,
  contractName,
  setContractName,
  editContract,
}) => {
  const ref = useDetectClickOutside({ onTriggered: toogleInput });
  return (
    <input
      className="accordion__container__input"
      value={contractName}
      onChange={(e) => setContractName(e.target.value)}
      onKeyDown={editContract}
    />
  );
};
