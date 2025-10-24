import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";

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
    <div className="flex gap-2">
      <input
        maxLength={64}
        {...rest}
        type="text"
        value={value}
        onChange={onInputChange}
        className="w-full h-10 border border-gray-300 rounded px-2 py-1"
      />
      <button
        type="button"
        onClick={onButtonClick}
        className="h-10 bg-blue-500 text-white px-4 py-1 rounded shrink-0"
        disabled={!isValid}
      >
        {confirmButtonLabel}
      </button>
      {cancel && (
        <button
          type="button"
          onClick={cancel}
          className="h-10 bg-gray-300 text-black px-4 py-1 rounded shrink-0"
        >
          {cancelButtonLabel}
        </button>
      )}
    </div>
  );
};
