import { SidebarButton } from "../Sidebar/SidebarButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ActionHeader = () => {

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
    </div>
  );
};
