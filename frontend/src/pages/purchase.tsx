import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import { config } from "@/utils/config";
import { SmartContractConfig } from "@/utils/config";
import { disableHelper, generateContracts } from "@/utils/utils";
import { EmojiType } from "@/utils/type";

export default function Purchase() {
  const account = useAccount({ config });
  const [emojiList, setEmojiList] = useState<EmojiType[]>([]);
  const [pendingEmojiId, setPendingEmojiId] = useState<bigint | null>(null);
  const { isPending, isSuccess, isError, writeContract } = useWriteContract();

  // get number of emojis
  const {
    data: emojiCountData,
    isLoading: isCountLoading,
    isError: isCountError,
    error: countError,
  } = useReadContract({
    ...SmartContractConfig,
    functionName: "getEmojiCount",
  });

  const emojiCount: number = emojiCountData ? Number(emojiCountData) : 0;

  // dynamic generate contracts requests
  const emojiContracts = generateContracts(emojiCount);

  // get Emojis from smart contracts
  const {
    data: emojiData,
    isLoading: isEmojiLoading,
    isError: isEmojiError,
    error: emojiError,
  } = useReadContracts({
    contracts: emojiContracts,
  });

  // Purchase function
  const purchaseEmoji = (emoji_id: bigint) => {
    const emoji_price = emojiList[Number(emoji_id - 1n)].price;

    setPendingEmojiId(emoji_id);
    writeContract({
      ...SmartContractConfig,
      address: SmartContractConfig.address!,
      functionName: "purchaseEmoji",
      args: [BigInt(emoji_id)],
      value: emoji_price,
    });
  };

  useEffect(() => {
    if (emojiData) {
      const parsedEmoji: EmojiType[] = emojiData.map((result) => {
        return result.result as EmojiType;
      });
      setEmojiList(parsedEmoji);
      console.log(parsedEmoji);
    }
  }, [emojiData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("🚀 Purchase Success!");
      setPendingEmojiId(null); // 清除 pending 狀態
    }
    if (isError) {
      toast.error("❌ Purchase Failed!");
      setPendingEmojiId(null); // 清除 pending 狀態
    }
  }, [isSuccess, isError]);

  // handle loading and error
  if (isCountLoading || isEmojiLoading) {
    return <p>Loading...</p>;
  }

  if (isCountError) {
    return <p>Error fetching emoji count: {countError?.message}</p>;
  }

  if (isEmojiError) {
    return <p>Error fetching emojis: {emojiError?.message}</p>;
  }

  return (
    <div>
      <h1 className="text-5xl flex justify-center">
        <button className="flex gap-2 duration-300 hover:scale-105">
          <p className="font-bold gradient-text">
            <NavLink to="/">Emoji Store</NavLink>
          </p>
          🔥
        </button>
      </h1>

      <p className="text-slate-600 italic my-3">Total Emojis: {emojiCount}</p>
      <div className="grid grid-cols-3 gap-4">
        {emojiList.map((emoji) => (
          <Card key={emoji.id} className="p-4 w-[250px]">
            <CardContent>
              <div className="bg-emoji w-full text-5xl h-[150px] flex justify-center items-center rounded-md">
                <p className="duration-300 hover:scale-125">
                  {/* todo: smart contract's problem */}
                  {emoji.hexCode.slice(0, 2) == "0x"
                    ? String.fromCodePoint(parseInt(emoji.hexCode, 16))
                    : emoji.hexCode}
                </p>
              </div>
              <div className="font-bold mt-5 text-red-500">
                {emoji.price.toString()} wei
              </div>
              <div>Owner: {emoji.owner.slice(0, 10)}...</div>
              {/* <div>Creator: {emoji.creator.slice(0, 10)}...</div> */}
              <div className="italic text-slate-500 mt-5">
                "{emoji.description}"
              </div>
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => purchaseEmoji(emoji.id)}
                disabled={disableHelper({
                  emoji,
                  pendingEmojiId,
                  isPending,
                  account_addr: account?.address!,
                })}
              >
                {pendingEmojiId === emoji.id ? "Processing..." : "Purchase"}
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
