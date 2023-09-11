import { SidebarButton } from "../Sidebar/SidebarButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBonadocsStore } from "../../store";
import Modal from "react-modal";
import { useState } from "react";
import close from "../../image/close.svg";
import { toast } from "react-toastify";
import { Bars } from "react-loading-icons";

export const MethodHeader = () => {
  const collection = useBonadocsStore((state) => state.collection);
  const [isOpen, setIsOpen] = useState(false);
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.60)",
    },
    content: {
      display: "grid",
      top: "40%",
      left: "50%",
      border: "none",
      overflowY: "hidden",
      borderRadius: "8px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: `min-content`,
      minHeight: `20rem`,
      maxHeight: `70rem`,
      backgroundColor: "transparent",
      width: "40%",
      display: "grid",
    },
  };
  function openModal() {
    setIsOpen(!isOpen);
  }

  function closeModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="contract__utils">
      <SidebarButton />

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected = ready && account && chain;
          return (
            <>
              {!connected ? (
                <button
                  className="contract__utils__button__connect"
                  onClick={openConnectModal}
                  type="button"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  className="contract__utils__button__connect"
                  onClick={openChainModal}
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          style={{ width: 12, height: 12 }}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button>
              )}
            </>
          );
        }}
      </ConnectButton.Custom>
      <button
        onClick={async () => {
          try {
            setLoading(true);
            let ipfsUri = await collection.save();
            setUri(ipfsUri);
            setIsOpen(true);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            toast.err(err);
          }
        }}
        className="contract__utils__button"
      >
        {loading ? <Bars className="loader__bars" /> : <>Publish</>}
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Contract Modal"
      >
        <div className="modal__close" onClick={closeModal}>
          <img className="modal__close__img" src={close} />
        </div>
        <div className="modal__container">{uri}</div>
      </Modal>
    </div>
  );
};
