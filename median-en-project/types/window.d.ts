/**
 * Global type declarations for window object extensions
 * Production-grade TypeScript type safety for blockchain and Web3
 */

import type { ExternalProvider } from 'ethers'

declare global {
  interface Window {
    /**
     * Ethereum provider injected by MetaMask, Coinbase Wallet, etc.
     * Extends the standard ExternalProvider from ethers.js
     */
    ethereum?: ExternalProvider & {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      selectedAddress?: string | null
      chainId?: string
      networkVersion?: string
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}

export {}
