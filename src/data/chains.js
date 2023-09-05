export const supportedChains = new Map([
  [
    "evm:56",
    {
      chainId: 56,
      networkId: 56,
      jsonRpcUrl: "https://bsc-dataseed.binance.org",
      blockscanUrl: "https://bscscan.com",
      blockscanType: "etherscan",
      chain: "bscscan",
    },
  ],
  [
    "evm:1",
    {
      chainId: 1,
      chain: "ethereum",
      networkId: 1,
      jsonRpcUrl: "https://eth.llamarpc.com",
      blockscanUrl: "https://api.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:250",
    {
      chainId: 250,
      networkId: 250,
      chain: "fantom",
      jsonRpcUrl: "https://rpcapi.fantom.network",
      blockscanUrl: "https://ftmscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:10",
    {
      chainId: 10,
      networkId: 10,
      chain: "optimism",
      jsonRpcUrl: "https://mainnet.optimism.io",
      blockscanUrl: "https://optimistic.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:42161",
    {
      chainId: 42161,
      networkId: 42161,
      chain: "arbitrum",
      jsonRpcUrl: "https://arb1.arbitrum.io/rpc",
      blockscanUrl: "https://arbiscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:43114",
    {
      chainId: 43114,
      networkId: 43114,
      chain: "avanlanche",
      jsonRpcUrl: "https://api.avax.network/ext/bc/C/rpc",
      blockscanUrl: "https://snowtrace.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:137",
    {
      chainId: 137,
      networkId: 137,
      chain: "polygon",
      jsonRpcUrl: "https://polygon.llamarpc.com",
      blockscanUrl: "https://polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:42220",
    {
      chainId: 42220,
      networkId: 42220,
      chain: "celo",
      jsonRpcUrl: "https://forno.celo.org",
      blockscanUrl: "https://celoscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:100",
    {
      chainId: 100,
      chain: "gnosis",
      networkId: 100,
      jsonRpcUrl: "https://rpc.gnosischain.com",
      blockscanUrl: "https://gnosisscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:5",
    {
      chainId: 5,
      networkId: 5,
      chain: "goerli",
      jsonRpcUrl: "https://rpc.ankr.com/eth_goerli",
      blockscanUrl: "https://api-goerli.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:97",
    {
      chainId: 97,
      networkId: 97,
      chain: "bscscan testnet",
      jsonRpcUrl: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      blockscanUrl: "https://testnet.bscscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:199",
    {
      chainId: 199,
      networkId: 199,
      chain: "btt chain",
      jsonRpcUrl: "https://rpc.bittorrentchain.io",
      blockscanUrl: "https://bttcscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:1101",
    {
      chainId: 1101,
      networkId: 1101,
      chain: "polygon zkevm",
      jsonRpcUrl: "https://rpc.ankr.com/polygon_zkevm",
      blockscanUrl: "https://zkevm.polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:4002",
    {
      chainId: 4002,
      networkId: 4002,
      chain: "fantom testnet",
      jsonRpcUrl: "https://rpc.testnet.fantom.network",
      blockscanUrl: "https://testnet.ftmscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:43113",
    {
      chainId: 43113,
      networkId: 1,
      chain: "avalanche testnet",
      jsonRpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
      blockscanUrl: "https://testnet.snowtrace.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:44787",
    {
      chainId: 44787,
      networkId: 44787,
      chain: "celo testnet",
      jsonRpcUrl: "https://alfajores-forno.celo-testnet.org",
      blockscanUrl: "https://celoscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:80001",
    {
      chainId: 80001,
      networkId: 80001,
      chain: "mumbai",
      jsonRpcUrl: "https://rpc-mumbai.maticvigil.com",
      blockscanUrl: "https://mumbai.polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:421611",
    {
      chainId: 421611,
      networkId: 421611,
      chain: "arbitrum testnet",
      jsonRpcUrl: "https://rinkeby.arbitrum.io/rpc",
      blockscanUrl: "https://testnet.arbiscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:11155111",
    {
      chainId: 11155111,
      networkId: 11155111,
      chain: "sepholia",
      jsonRpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
      blockscanUrl: "https://api-sepolia.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
]);

export const chains = Array.from(supportedChains);
