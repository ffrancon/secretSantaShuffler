import { CopyIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button, type ButtonProps } from "./Button";

type Props = {
  content: string;
} & Omit<ButtonProps, "onClick">;

export const CopyToClipboardButton = ({ content, ...buttonProps }: Props) => {
  const copyPairsToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      return true;
    } catch (error) {
      console.error("Failed to copy pairs to clipboard:", error);
      return false;
    }
  }, [content]);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) return;

    const success = await copyPairsToClipboard();

    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Will replace this with a toast later (because accessibility concerns) */}
      {isCopied && <p>👍</p>}
      <Button
        onClick={handleCopy}
        {...buttonProps}
        aria-label="Copy content to clipboard"
      >
        <CopyIcon size="16" />
      </Button>
    </div>
  );
};
