import "./styles/css/index.css";
import { SetupScreen } from "./pages/SetupScreen";
import { Editor } from "./pages/Editor";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Modal from "react-modal";
import { MethodWrapper } from "./components/Methods/MethodWrapper";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { history } from "./_helpers/history";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  bsc,
  fantom,
  avalanche,
  celo,
  gnosis,
  goerli,
  bscTestnet,
  polygonZkEvm,
  fantomTestnet,
  avalancheFuji,
  celoAlfajores,
  polygonMumbai,
  arbitrumGoerli,
} from "wagmi/chains";
import { useBonadocsStore } from "./store";
import { publicProvider } from "wagmi/providers/public";
import { ActionWrapper } from "./components/Actions/ActionWrapper";
import { Variable } from "./pages/Variable";
const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
    bsc,
    fantom,
    avalanche,
    celo,
    gnosis,
    goerli,
    bscTestnet,
    polygonZkEvm,
    fantomTestnet,
    avalancheFuji,
    celoAlfajores,
    polygonMumbai,
    arbitrumGoerli,
    sepolia,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Bonadocs",
  projectId: "3bbc4142ce9f7ae91285bf1b59f7b0f8",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

Modal.setAppElement("#root");

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  const setCurrentMethod = useBonadocsStore((state) => state.setCurrentMethod);
  useEffect(() => {
    initiateMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initiateMethod = () => {
    const data = window.localStorage.getItem("current");
    if (data !== null) {
      setCurrentMethod(JSON.parse(data));
      console.log(JSON.parse(data));
    }
  }
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="App" id="root">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<SetupScreen />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/editor" element={<Editor />}>
                <Route path="method" element={<MethodWrapper />} />
                <Route path="action" element={<ActionWrapper />} />
                <Route path="variable" element={<Variable />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
