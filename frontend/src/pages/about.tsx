import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">關於 🎉</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
      👾 這是 Vic 為了區塊鏈做ㄉ小小專案 👿
      </CardContent>
    </Card>
  );
}
