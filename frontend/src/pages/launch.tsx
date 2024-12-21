import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiStorePicker } from "@/components/customs/emoji-picker";
import { LaunchFormSchema, LaunchFormSchemaType } from "@/utils/type";
import { useWriteContract } from "wagmi";
import { SmartContractConfig } from "@/utils/config";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Launch() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<LaunchFormSchemaType>({
    resolver: zodResolver(LaunchFormSchema),
  });

  const {
    data: hash,
    isPending,
    isSuccess,
    isError,
    writeContract,
  } = useWriteContract();

  const onSubmit = (formdata: LaunchFormSchemaType) => {
    writeContract({
      ...SmartContractConfig,
      address: SmartContractConfig.address!,
      functionName: "addEmoji",
      args: [formdata.emoji, formdata.description, BigInt(formdata.price)],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("🚀 Emoji Launched!");
    }
    if (isError) {
      toast.error("❌ launch emoji Failed!");
    }
  }, [isError, isSuccess]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Launch your emoji 🚀
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* emoji picker */}
          <Controller
            name="emoji"
            control={control}
            render={({ field }) => (
              <EmojiStorePicker
                value={field.value}
                onChange={(emoji: string) => setValue("emoji", emoji)}
              />
            )}
          />
          {errors.emoji && (
            <span className="text-red-500 text-xs">{errors.emoji.message}</span>
          )}

          <div className="grid w-full items-center gap-4 mt-3">
            {/* Price Input */}
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="price" className="text-base">
                金額 (wei)
              </Label>
              <Input
                type="number"
                defaultValue={100}
                placeholder="請輸入..."
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Description Input */}
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="description" className="text-base">
                介紹
              </Label>
              <Textarea
                id="description"
                placeholder="請輸入..."
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-ful mt-5">
            <Button
              variant="outline"
              type="submit"
              disabled={isPending}
              className="duration-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 w-full"
            >
              {isPending ? "Launching... 🚀" : "Launch 🚀"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
