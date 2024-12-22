import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubLogo, LinkedInLogo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl">關於 🎉</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        <div className="my-3">👾 這是 Vic 為了區塊鏈成發做ㄉ小小專案 👿</div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full flex-wrap">
            本專案使用了 React, TypeScript, Tailwind CSS, Vite, Wagmi,
            Ethers.js, Hardhat, Solidity 進行製作，實作了一個簡單的 NFT 商店。
          </div>
          <div>
            整個專案跨時三天，從前端到
            <a className="text-blue-500 hover:underline" href="https://sepolia.etherscan.io/address/0xFC059Fe6e1ee844E02143Cac536aD994b638c547">
              智能合約
            </a>
            ，從設計到部署，皆由一人完成。
          </div>
          <div>
            相關程式碼已經開源在 GitHub 上，歡迎參觀 🚀
          </div>
        </div>
        <Separator className="mt-5" />
        <div className="flex gap-3 justify-around">
          <GitHubRepoButton />
          <LinkedInButton />
        </div>
      </CardContent>
    </Card>
  );
}

const GitHubRepoButton = () => {
  return (
    <Button
      variant="link"
      className="flex gap-1"
      linkTo="https://github.com/viiccwen/emoji-store"
    >
      GitHub
      <GitHubLogo />
    </Button>
  );
};

const LinkedInButton = () => {
  return (
    <Button
      variant="link"
      className="flex gap-1"
      linkTo="https://www.linkedin.com/in/guan-hua-wen-625bb0270/"
    >
      LinkedIn
      <LinkedInLogo />
    </Button>
  );
};
