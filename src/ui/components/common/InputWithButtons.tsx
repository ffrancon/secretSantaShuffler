import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

type Props = {
  initialValue?: string;
  propagate: (value: string) => void;
  cancel?: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
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

  return (
    <div className="flex items-center gap-2">
      <Input
        maxLength={64}
        {...rest}
        type="text"
        value={value}
        onChange={onInputChange}
      />
      <Button onClick={onButtonClick} disabled={!isValid}>
        {confirmButtonLabel}
      </Button>
      {cancel && <Button onClick={cancel}>{cancelButtonLabel}</Button>}
    </div>
  );
};
