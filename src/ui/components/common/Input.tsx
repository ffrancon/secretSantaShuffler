type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => {
  return (
    <input
      {...props}
      className={`block h-[32px] w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-1 text-sm text-slate-200 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    />
  );
};
