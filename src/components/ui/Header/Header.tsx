import { memo } from "react";
import "./Header.css";

export const Header = memo(() => {
  return (
    <header className="flex w-full items-center justify-center pt-4 pb-6">
      <h1 className="satisfy-regular text-4xl font-semibold text-slate-300">
        Secret Santa Shuffler
      </h1>
    </header>
  );
});
