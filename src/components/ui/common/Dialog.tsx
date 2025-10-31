import { createPortal } from "react-dom";
import {
  Activity,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { Button } from "./Button";

type Props = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  close: () => void;
};

export const Dialog = ({ isOpen, title, children, close }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

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
            <div>{children}</div>
          </div>
          <div className="mt-2 flex justify-end border-t border-slate-700 p-2">
            <Button variant="secondary" onClick={close}>
              Done
            </Button>
          </div>
        </div>
      </Activity>
    ),
    [title, children, isOpen, close],
  );

  const body = document.querySelector("body");

  if (!(body instanceof HTMLElement)) return null;

  return createPortal(dialog, body);
};
