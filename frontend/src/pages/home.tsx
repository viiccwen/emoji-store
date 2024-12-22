import { Button } from "@/components/ui/button";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { config, metamask_connector } from "@/utils/config";
import { toast } from "sonner";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaitingButton } from "@/components/customs/waiting-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getBalance, walletActions } from "@/utils/utils";

export default function Home() {
  const { connect, isSuccess, isError } = useConnect({ config });
  const { disconnect } = useDisconnect({ config });
  const account = useAccount({ config });
  const balance = useBalance({ address: account.address, config });

  useEffect(() => {
    if (isSuccess) {
      toast.success("歡迎來到 Emoji Store 🥳");
    } else if (isError) {
      toast.error("連接失敗...請重試！");
    }
  }, [isSuccess, isError]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">歡迎來到 Emoji Store 🥳</CardTitle>
      </CardHeader>
      <CardContent>
        {account.isConnected ? (
          <div className="flex flex-col gap-3">
            <span>Connected account: {account.address}</span>
            <span>
              Connected Balanced: {getBalance(balance.data?.value, "ether")}
            </span>
            <div className="flex w-full gap-3">
              <Button linkTo="launch" variant="outline" className="flex-1">
                上架 🥵
              </Button>
              <Button linkTo="purchase" variant="outline" className="flex-1">
                購買 🛒
              </Button>
              <Button
                className="flex-1"
                onClick={() =>
                  walletActions(
                    "disconnect",
                    connect,
                    disconnect,
                    metamask_connector
                  )
                }
              >
                斷開鎖鏈 ⛓️‍💥
              </Button>
            </div>
          </div>
        ) : account.isConnecting ? (
          <WaitingButton>連接中...</WaitingButton>
        ) : (
          <Button
            className={cn(
              "w-full bg-emoji font-bold hover:scale-105 duration-300"
            )}
            onClick={() =>
              walletActions("connect", connect, disconnect, metamask_connector)
            }
          >
            連接
            <img
              src="/metamask_logo.png"
              className="w-5 h-5"
              alt="Metamask Logo"
            />
          </Button>
        )}

        <div className="flex flex-col w-full mt-5 gap-2">
          <Separator className="w-full h-[2px]" />
          <Button linkTo="about" variant="link" className="flex-1">
            這是什麼？
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
