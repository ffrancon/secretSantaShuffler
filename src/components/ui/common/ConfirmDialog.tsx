import { createPortal } from "react-dom";
import { Button } from "./Button";
import { Activity, useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  content: string;
  confirm: () => void;
  close: () => void;
  isDestructive?: boolean;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  content,
  confirm,
  close,
  isDestructive = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onConfirm = useCallback(() => {
    confirm();
    close();
  }, [confirm, close]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    },
    [close],
  );

  const onClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", onClickOutside);
    } else {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen, onKeyDown, onClickOutside]);

  const dialog = useMemo(
    () => (
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:opacity-40" />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-800 shadow-md transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300"
        >
          <div className="p-3">
            <h6
              id="confirm-dialog-title"
              className="text-md mb-2 font-semibold text-slate-200"
            >
              {title}
            </h6>
            <p
              id="confirm-dialog-description"
              className="text-sm text-slate-400"
            >
              {content}
            </p>
          </div>
          <div className="mt-2 flex justify-between border-t border-slate-700 p-3">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button
              variant={isDestructive ? "destructive" : "primary"}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Activity>
    ),
    [title, content, onConfirm, close, isOpen, isDestructive],
  );

  const body = document.querySelector("body");

  if (!(body instanceof HTMLElement)) return null;

  return createPortal(dialog, body);
};
