import {
  useMemo,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";

type Props = {
  initialValue?: string;
  propagate: (value: string) => void;
  buttonLabel?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const SingleInputWithButton = ({
  initialValue,
  propagate,
  buttonLabel = "Confirm",
  ...rest
}: Props) => {
  const [value, setValue] = useState(initialValue || "");

  const isValid = useMemo(() => {
    if (!value) return false;
    return value.trim().length > 0;
  }, [value]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onButtonClick = () => {
    if (isValid) {
      propagate(value.trim());
    }
  };

  return (
    <div className="flex gap-2">
      <input
        {...rest}
        type="text"
        value={value}
        onChange={onInputChange}
        maxLength={64}
        className="w-full h-10 border border-gray-300 rounded px-2 py-1"
      />
      <button
        type="button"
        onClick={onButtonClick}
        className="h-10 bg-blue-500 text-white px-4 py-1 rounded shrink-0"
        disabled={!isValid}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
