import { cn } from "@/lib/utils";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";

interface EmojiStorePickerProps {
  className?: string;
  value: string | null;
  onChange: (emoji: string) => void;
}

export const EmojiStorePicker = (props: EmojiStorePickerProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emoji: EmojiClickData) => {
    props.onChange(emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className={cn("relative", props.className)}>
      <button
        className="bg-emoji w-full text-5xl rounded-lg shadow-lg h-[220px]"
        onClick={(e) => {
          e.preventDefault();
          setShowEmojiPicker(!showEmojiPicker);
        }}
      >
        {props.value}
      </button>
      {showEmojiPicker && (
        <div className="absolute top-0 left-[110%] z-50">
          <EmojiPicker
            onEmojiClick={(emoji: EmojiClickData) => onEmojiClick(emoji)}
          />
        </div>
      )}
    </div>
  );
};
