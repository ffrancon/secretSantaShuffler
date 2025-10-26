import { memo, type ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "destructive";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-slate-500 hover:bg-slate-600 text-slate-200",
  secondary: "border border-slate-500 hover:border-slate-600 text-slate-300",
  destructive: "bg-rose-700 hover:bg-rose-800 text-white hover:text-slate-200",
};

export const Button = memo<ButtonProps>(
  ({ children, className, variant = "primary", ...props }) => {
    return (
      <button
        className={`${variantClasses[variant]} h-[32px] shrink-0 rounded px-2 py-1.5 text-sm shadow-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
