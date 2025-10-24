type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => {
  return (
    <input
      {...props}
      className={`h-[32px] text-sm border border-neutral-300 rounded-md block w-full py-1 px-3 bg-neutral-100 text-neutral-700 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};
