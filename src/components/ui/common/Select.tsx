import { memo, type SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = memo<Props>(({ className, ...props }) => {
  return (
    <select
      {...props}
      className={`block h-[32px] w-full rounded-md border border-slate-600 bg-slate-800 py-1 pr-4 pl-2 text-sm text-slate-200 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    />
  );
});
