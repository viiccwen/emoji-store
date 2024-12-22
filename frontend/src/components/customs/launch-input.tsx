import { FieldError, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { LaunchFormSchemaType } from "@/utils/type";
import { Button } from "../ui/button";

interface PriceInputProps {
  className?: string;
  register: UseFormRegister<LaunchFormSchemaType>;
  price_error?: FieldError | undefined;
}

export const PriceInput = (props: PriceInputProps) => {
  return (
    <div className={cn(props.className)}>
      <Label htmlFor="price" className="text-base">
        金額 (wei)
      </Label>
      <Input
        type="number"
        defaultValue={100}
        placeholder="請輸入..."
        {...props.register("price", { valueAsNumber: true })}
      />
      {props.price_error && (
        <span className="text-red-500 text-sm">
          {props.price_error.message}
        </span>
      )}
    </div>
  );
};

interface DescriptionInputProps {
  className?: string;
  register: any;
  description_error?: FieldError | undefined;
}

export const DescriptionInput = (props: DescriptionInputProps) => {
  return (
    <div className={cn(props.className)}>
      <Label htmlFor="description" className="text-base">
        介紹
      </Label>
      <Textarea
        id="description"
        placeholder="請輸入..."
        {...props.register("description")}
      />
      {props.description_error && (
        <span className="text-red-500 text-xs">
          {props.description_error.message}
        </span>
      )}
    </div>
  );
};

interface LaunchButtonProps {
    className?: string;
    isPending: boolean;
}

export const LaunchButton = (props: LaunchButtonProps) => {
  return (
    <div className={cn(props.className)}>
      <Button
        variant="outline"
        type="submit"
        disabled={props.isPending}
        className="duration-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 w-full"
      >
        {props.isPending ? "Launching... 🚀" : "Launch 🚀"}
      </Button>
    </div>
  );
};
