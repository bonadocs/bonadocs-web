export const supportedChains = new Map([
  [
    "evm:56",
    {
      chainId: 56,
      networkId: 56,
      jsonRpcUrl: "https://bsc-dataseed.binance.org",
      blockscanUrl: "https://api.bscscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:1",
    {
      chainId: 1,
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
      jsonRpcUrl: "https://rpcapi.fantom.network",
      blockscanUrl: "https://api.ftmscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:10",
    {
      chainId: 10,
      networkId: 10,
      jsonRpcUrl: "https://mainnet.optimism.io",
      blockscanUrl: "https://api-optimistic.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:42161",
    {
      chainId: 42161,
      networkId: 42161,
      jsonRpcUrl: "https://arb1.arbitrum.io/rpc",
      blockscanUrl: "https://api.arbiscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:43114",
    {
      chainId: 43114,
      networkId: 43114,
      jsonRpcUrl: "https://api.avax.network/ext/bc/C/rpc",
      blockscanUrl: "https://api.snowtrace.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:137",
    {
      chainId: 137,
      networkId: 137,
      jsonRpcUrl: "https://polygon.llamarpc.com",
      blockscanUrl: "https://api.polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:42220",
    {
      chainId: 42220,
      networkId: 42220,
      jsonRpcUrl: "https://forno.celo.org",
      blockscanUrl: "https://api.celoscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:100",
    {
      chainId: 100,
      networkId: 100,
      jsonRpcUrl: "https://rpc.gnosischain.com",
      blockscanUrl: "https://api.gnosisscan.io/",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:5",
    {
      chainId: 5,
      networkId: 5,
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
      jsonRpcUrl: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      blockscanUrl: "https://api-testnet.bscscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:199",
    {
      chainId: 199,
      networkId: 199,
      jsonRpcUrl: "https://rpc.bittorrentchain.io",
      blockscanUrl: "https://api.bttcscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:1101",
    {
      chainId: 1101,
      networkId: 1101,
      jsonRpcUrl: "https://rpc.ankr.com/polygon_zkevm",
      blockscanUrl: "https://api-zkevm.polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:4002",
    {
      chainId: 4002,
      networkId: 4002,
      jsonRpcUrl: "https://rpc.testnet.fantom.network",
      blockscanUrl: "https://api-testnet.ftmscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:43113",
    {
      chainId: 43113,
      networkId: 1,
      jsonRpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
      blockscanUrl: "https://api-testnet.snowtrace.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:44787",
    {
      chainId: 44787,
      networkId: 44787,
      jsonRpcUrl: "https://alfajores-forno.celo-testnet.org",
      blockscanUrl: "https://api-alfajores.celoscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:80001",
    {
      chainId: 80001,
      networkId: 80001,
      jsonRpcUrl: "https://rpc-mumbai.maticvigil.com",
      blockscanUrl: "https://api-testnet.polygonscan.com",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:421613",
    {
      chainId: 421613,
      networkId: 421613,
      jsonRpcUrl: "https://goerli.arbitrum.io/rpc",
      blockscanUrl: "https://api-goerli.arbiscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:11155111",
    {
      chainId: 11155111,
      networkId: 11155111,
      jsonRpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
      blockscanUrl: "https://api-sepolia.etherscan.io",
      blockscanType: "etherscan",
    },
  ],
  [
    "evm:8453",
    {
      chainId: 8453,
      networkId: 8453,
      jsonRpcUrl: "https://base.publicnode.com",
      blockscanUrl: "https://api.basescan.org",
      blockscanType: "etherscan",
    },
  ],
]);

export const chains = Array.from(supportedChains);
