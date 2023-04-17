/* eslint-disable */
interface EthereumProvider {
  isMetaMask: boolean;
  isConnected: () => boolean;
  request: ({}) => Promise<any>;
  on: any;
}

export {};

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}
