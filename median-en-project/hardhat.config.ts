import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@oasisprotocol/sapphire-hardhat";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Median EN - Blockchain Healthcare Platform
 * Hardhat Configuration for Oasis Sapphire + Avalanche
 *
 * Networks:
 * - Oasis Sapphire Testnet: Confidential patient records (TEE)
 * - Avalanche Fuji: Insurance claims & settlements
 * - Oasis Sapphire Mainnet: Production deployment
 * - Avalanche C-Chain: Production deployment
 */

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // Required for Oasis Sapphire
    },
  },

  networks: {
    // ==================== OASIS SAPPHIRE NETWORKS ====================

    "sapphire-testnet": {
      url: "https://testnet.sapphire.oasis.io",
      chainId: 0x5aff,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 30000000000, // 30 Gwei
    },

    "sapphire-mainnet": {
      url: "https://sapphire.oasis.io",
      chainId: 0x5afe,
      accounts: process.env.PRIVATE_KEY_MAINNET ? [process.env.PRIVATE_KEY_MAINNET] : [],
      gasPrice: 30000000000,
    },

    // ==================== AVALANCHE NETWORKS ====================

    "avalanche-fuji": {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 25000000000, // 25 Gwei
    },

    "avalanche-mainnet": {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: process.env.PRIVATE_KEY_MAINNET ? [process.env.PRIVATE_KEY_MAINNET] : [],
      gasPrice: 25000000000,
    },

    // ==================== HEALTHCARE SUBNET (CUSTOM L1) ====================

    "healthcare-subnet-testnet": {
      url: process.env.HEALTHCARE_SUBNET_RPC || "http://localhost:9650/ext/bc/healthcareChain/rpc",
      chainId: parseInt(process.env.HEALTHCARE_SUBNET_CHAIN_ID || "99999"),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 25000000000,
    },

    // ==================== LOCAL DEVELOPMENT ====================

    hardhat: {
      chainId: 1337,
      forking: process.env.FORKING_ENABLED === "true" ? {
        url: process.env.FORKING_URL || "https://testnet.sapphire.oasis.io",
        blockNumber: parseInt(process.env.FORKING_BLOCK_NUMBER || "0"),
      } : undefined,
    },

    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
  },

  // ==================== ETHERSCAN VERIFICATION ====================

  etherscan: {
    apiKey: {
      // Oasis Sapphire uses custom verification
      "sapphire-testnet": process.env.OASIS_API_KEY || "not-needed",
      "sapphire-mainnet": process.env.OASIS_API_KEY || "not-needed",

      // Avalanche
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
    },
    customChains: [
      {
        network: "sapphire-testnet",
        chainId: 0x5aff,
        urls: {
          apiURL: "https://testnet.explorer.sapphire.oasis.io/api",
          browserURL: "https://testnet.explorer.sapphire.oasis.io",
        },
      },
      {
        network: "sapphire-mainnet",
        chainId: 0x5afe,
        urls: {
          apiURL: "https://explorer.sapphire.oasis.io/api",
          browserURL: "https://explorer.sapphire.oasis.io",
        },
      },
    ],
  },

  // ==================== GAS REPORTER ====================

  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    outputFile: "gas-report.txt",
    noColors: true,
  },

  // ==================== PATHS ====================

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  // ==================== MOCHA TEST CONFIG ====================

  mocha: {
    timeout: 40000,
  },
};

export default config;
