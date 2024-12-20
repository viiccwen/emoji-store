import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SmartContractConfig } from "@/utils/config";
import { useEffect, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { ShoppingCart } from "lucide-react";

interface Emoji {
  id: number;
  hexCode: string;
  description: string;
  price: number;
  owner: string;
  creator: string;
}

export default function Purchase() {
  const [emojiList, setEmojiList] = useState<Emoji[]>([]);

  // 取得 emojiCount
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
  const emojiContracts =
    emojiCount > 1
      ? Array.from({ length: emojiCount }, (_, i) => ({
          ...SmartContractConfig,
          functionName: "getEmoji",
          args: [i + 1], // from 1 ~ emojiCount
        }))
      : [];

  // get Emojis from smart contracts
  const {
    data: emojiData,
    isLoading: isEmojiLoading,
    isError: isEmojiError,
    error: emojiError,
  } = useReadContracts({
    contracts: emojiContracts,
  });

  useEffect(() => {
    if (emojiData) {
      const parsedEmoji: Emoji[] = emojiData.map((result) => {
        return result.result as Emoji;
      });
      setEmojiList(parsedEmoji);
      console.log(parsedEmoji);
    }
  }, [emojiData]);

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
      <h1>Emoji List</h1>
      <p>Total Emojis: {emojiCount}</p>
      <div className="flex flex-col gap-4">
        {emojiList.map((emoji) => (
          <Card key={emoji.id} className="p-4 w-[250px]">
            <CardContent>
              <div className="w-full text-5xl h-[150px] flex justify-center items-center rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {String.fromCodePoint(parseInt(emoji.hexCode, 16))}
              </div>
              <div className="font-bold mt-5 text-red-500">{emoji.price.toString()} ether</div>
              <div>Owner: {emoji.owner.slice(0, 10)}...</div>
              {/* <div>Creator: {emoji.creator.slice(0, 10)}...</div> */}
              <div className="italic text-slate-500 mt-5">"{emoji.description}"</div>
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button variant="outline" className="w-full">
                Purchase
                <ShoppingCart className="w-3 h-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
