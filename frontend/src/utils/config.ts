import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

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
