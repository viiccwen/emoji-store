import { formatUnits } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { config, metamask_connector, SmartContractConfig } from "./config";
import { EmojiType } from "./type";

type connectType = ReturnType<typeof useConnect<typeof config>>["connect"];
type disconnectType = ReturnType<typeof useDisconnect>["disconnect"];
type metamask_connectorType = typeof metamask_connector;

// home helper function
export const walletActions = (
  event_type: "connect" | "disconnect",
  connect: connectType,
  disconnect: disconnectType,
  metamask_connector: metamask_connectorType
) => {
  if (event_type === "connect") connect({ connector: metamask_connector });
  else if (event_type === "disconnect") disconnect();
};

export const getBalance = (
  balance: bigint | undefined,
  format_unit: "ether" | "wei"
): string => {
  if (!balance) return "Balance not found...";
  if (format_unit === "ether") return formatUnits(balance, 18) + " eth";
  else if (format_unit === "wei") return formatUnits(balance, 0) + " wei";
  return "Error!";
};

// purchase helper function

// generate emoji contract parameters
export const generateContracts = (emojiCount: number) => {
  return Array.from({ length: emojiCount }, (_, i) => ({
    ...SmartContractConfig,
    functionName: "getEmoji",
    args: [i + 1], // from 1 ~ emojiCount
  }));
}

// purchase helper function
interface PurchaseHelperProps {
  emoji: EmojiType;
  pendingEmojiId: bigint | null;
  isPending: boolean;
  account_addr: ReturnType<typeof useAccount<typeof config>>["address"];
}

export const disableHelper = (props: PurchaseHelperProps): boolean => {
  return (
    props.pendingEmojiId === props.emoji.id ||
    props.emoji.owner === props.account_addr ||
    props.isPending
  );
};