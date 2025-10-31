import { useCallback, useEffect, useState } from "react";

export const useFocusTrap = (
  ref: React.RefObject<HTMLDialogElement | null>,
) => {
  const focusable = ref.current?.querySelectorAll<HTMLDialogElement>(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
  );

  const [focused, setFocused] = useState(focusable ? focusable[0] : null);
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!focusable || focusable.length === 0 || !focused) {
        return;
      }
      if (e.key === "Tab") {
        const indexOfFocused = Array.from(focusable).indexOf(focused);
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + Tab
          if (indexOfFocused === 0) {
            focusable[focusable.length - 1].focus();
            setFocused(focusable[focusable.length - 1]);
          } else {
            // Move focus to previous element
            focusable[indexOfFocused - 1].focus();
            setFocused(focusable[indexOfFocused - 1]);
          }
        } else {
          // Tab
          if (indexOfFocused === focusable.length - 1) {
            focusable[0].focus();
            setFocused(focusable[0]);
          } else {
            // Move focus to next element
            focusable[indexOfFocused + 1].focus();
            setFocused(focusable[indexOfFocused + 1]);
          }
        }
      }
    },
    [focused, focusable],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};
