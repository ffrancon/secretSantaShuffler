import {
  memo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { Button } from "./Button";
import { Input } from "./Input";

type Props = {
  initialValue?: string;
  propagate: (value: string) => void;
  cancel?: () => void;
  confirmButtonLabel?: ReactNode;
  confirmButtonAriaLabel?: string;
  cancelButtonLabel?: ReactNode;
  cancelButtonAriaLabel?: string;
  clearAfterConfirm?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithButtons = memo(
  ({
    initialValue,
    propagate,
    cancel,
    confirmButtonLabel = "Confirm",
    confirmButtonAriaLabel = "Confirm",
    cancelButtonLabel = "Cancel",
    cancelButtonAriaLabel = "Cancel",
    clearAfterConfirm = false,
    ...rest
  }: Props) => {
    const [value, setValue] = useState(initialValue || "");
    const isValueValid = value.trim().length > 0;

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const onButtonClick = () => {
      if (isValueValid) {
        propagate(value);
        if (clearAfterConfirm) {
          setValue("");
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onButtonClick();
      }
      if (e.key === "Escape" && cancel) {
        cancel();
      }
    };

    return (
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          {...rest}
          maxLength={64}
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={onButtonClick}
          disabled={!isValueValid}
          aria-label={confirmButtonAriaLabel}
        >
          {confirmButtonLabel}
        </Button>
        {cancel && (
          <Button
            variant="secondary"
            onClick={cancel}
            aria-label={cancelButtonAriaLabel}
          >
            {cancelButtonLabel}
          </Button>
        )}
      </div>
    );
  },
);
