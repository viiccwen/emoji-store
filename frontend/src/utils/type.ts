import { z } from "zod";

export const LaunchFormSchema = z.object({
  emoji: z.string().min(1, "請選擇一個 emoji"),
  price: z.number().min(1, "金額必須大於 0"),
  description: z.string().min(1, "介紹不可為空").max(100, "介紹必須小於 50 字"),
});

export type LaunchFormSchemaType = z.infer<typeof LaunchFormSchema>;