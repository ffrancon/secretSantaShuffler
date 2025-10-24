type Props = {
  variant?: "primary" | "destructive";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-emerald-500 hover:bg-emerald-600 text-slate-100",
  destructive: "bg-rose-600 hover:bg-rose-700 text-white hover:text-gray-100",
};

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`${variantClasses[variant]} py-1.5 px-2 text-sm rounded shadow-sm shrink-0 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
