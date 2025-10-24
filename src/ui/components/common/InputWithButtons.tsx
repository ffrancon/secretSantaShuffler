import {
  useState,
  type ChangeEvent,
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
  cancelButtonLabel?: ReactNode;
  clearAfterConfirm?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithButtons = ({
  initialValue,
  propagate,
  cancel,
  confirmButtonLabel = "Confirm",
  cancelButtonLabel = "Cancel",
  clearAfterConfirm = false,
  ...rest
}: Props) => {
  const [value, setValue] = useState(initialValue || "");

  const isValid = value.trim().length > 0;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onButtonClick = () => {
    if (isValid) {
      propagate(value);
    }
    if (clearAfterConfirm) {
      setValue("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        maxLength={64}
        {...rest}
        type="text"
        value={value}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        className="flex-grow"
      />
      <Button onClick={onButtonClick} disabled={!isValid}>
        {confirmButtonLabel}
      </Button>
      {cancel && (
        <Button variant="secondary" onClick={cancel}>
          {cancelButtonLabel}
        </Button>
      )}
    </div>
  );
};
