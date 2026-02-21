"use client";

/**
 * ConnectWallet Component
 * Web3 wallet connection for blockchain healthcare
 *
 * Supports:
 * - MetaMask
 * - WalletConnect
 * - Coinbase Wallet
 */

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, Shield, AlertCircle } from "lucide-react";

interface ConnectWalletProps {
  onConnect?: (address: string, provider: ethers.BrowserProvider) => void;
  requiredNetwork?: {
    chainId: number;
    name: string;
    rpcUrl: string;
  };
}

export default function ConnectWallet({
  onConnect,
  requiredNetwork,
}: ConnectWalletProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkCorrect, setNetworkCorrect] = useState(true);

  useEffect(() => {
    checkConnection();
    setupListeners();
  }, []);

  async function checkConnection() {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setProvider(provider);

          if (requiredNetwork) {
            await checkNetwork(provider);
          }

          onConnect?.(address, provider);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    }
  }

  async function checkNetwork(provider: ethers.BrowserProvider) {
    if (!requiredNetwork) return;

    const network = await provider.getNetwork();
    const correctNetwork = Number(network.chainId) === requiredNetwork.chainId;
    setNetworkCorrect(correctNetwork);

    if (!correctNetwork) {
      setError(
        `Please switch to ${requiredNetwork.name} (Chain ID: ${requiredNetwork.chainId})`
      );
    }
  }

  function setupListeners() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  }

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      setAccount(null);
      setProvider(null);
    } else {
      setAccount(accounts[0]);
      checkConnection();
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      setError("MetaMask not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      setProvider(provider);

      if (requiredNetwork) {
        await checkNetwork(provider);
        if (!networkCorrect) {
          await switchNetwork();
        }
      }

      onConnect?.(address, provider);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }

  async function switchNetwork() {
    if (!requiredNetwork || !window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${requiredNetwork.chainId.toString(16)}` }],
      });

      setNetworkCorrect(true);
      setError(null);
    } catch (switchError: any) {
      // Chain not added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${requiredNetwork.chainId.toString(16)}`,
                chainName: requiredNetwork.name,
                rpcUrls: [requiredNetwork.rpcUrl],
              },
            ],
          });
        } catch (addError: any) {
          setError(`Failed to add network: ${addError.message}`);
        }
      } else {
        setError(`Failed to switch network: ${switchError.message}`);
      }
    }
  }

  async function disconnectWallet() {
    setAccount(null);
    setProvider(null);
    setError(null);
  }

  if (account && networkCorrect) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Wallet Connected
              </p>
              <p className="text-xs text-gray-600 font-mono">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
          </div>

          <button
            onClick={disconnectWallet}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              {!networkCorrect && requiredNetwork && (
                <button
                  onClick={switchNetwork}
                  className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Switch to {requiredNetwork.name}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-5 w-5" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>

      <p className="text-xs text-center text-gray-500">
        Secure blockchain connection powered by{" "}
        {requiredNetwork?.name || "Ethereum"}
      </p>
    </div>
  );
}
