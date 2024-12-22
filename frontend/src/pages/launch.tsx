import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiStorePicker } from "@/components/customs/emoji-picker";
import { LaunchFormSchema, LaunchFormSchemaType } from "@/utils/type";
import { useWriteContract } from "wagmi";
import { SmartContractConfig } from "@/utils/config";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  DescriptionInput,
  LaunchButton,
  PriceInput,
} from "@/components/customs/launch-input";

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

  const { isPending, isSuccess, isError, writeContract } = useWriteContract();

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
        <CardTitle className="text-2xl font-bold flex justify-center gap-2">
          <p className=" gradient-text">Launch your emoji</p>
          <p>🚀</p>
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
            <PriceInput
              className="flex flex-col items-start space-y-1.5"
              register={register}
              price_error={errors.price}
            />

            {/* Description Input */}
            <DescriptionInput
              className="flex flex-col items-start space-y-1.5"
              register={register}
              description_error={errors.description}
            />
          </div>

          {/* Submit Button */}
          <LaunchButton className="w-ful mt-5" isPending={isPending} />
        </form>

        <Separator className="mt-6" />
        <Button variant="link" linkTo="/purchase">
          前往購買
        </Button>
      </CardContent>
    </Card>
  );
}
