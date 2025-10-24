type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => {
  return (
    <input
      {...props}
      className={`text-sm border border-slate-500 rounded-lg block w-full py-1.5 px-3 bg-slate-700 text-slate-100 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};
