type Props = {
  variant?: "primary" | "destructive";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-slate-500 hover:bg-slate-400 text-slate-100 hover:text-slate-50",
  destructive: "bg-rose-700 hover:bg-rose-900 text-white hover:text-gray-100",
};

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={`${variantClasses[variant]} py-1.5 px-4 text-sm rounded shadow-sm disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
