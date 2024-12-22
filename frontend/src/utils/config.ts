import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { abi } from "./abi";

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const metamask_connector = metaMask({
  dappMetadata: {
    name: "Emoji Store",
    url: "https://example.com",
    iconUrl: "https://example.com/favicon.ico",
  },
});

export const SmartContractConfig: {
  abi: typeof abi;
  address?: `0x${string}`
} = {
  abi,
  address: `0xFC059Fe6e1ee844E02143Cac536aD994b638c547`,
}