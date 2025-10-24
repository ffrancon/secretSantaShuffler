import "./Header.css";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center pt-4 pb-6">
      <h1 className="satisfy-regular text-4xl font-semibold">
        <span className="text-rose-600">Secret Santa</span>{" "}
        <span className="text-emerald-500">Shuffler</span>
      </h1>
    </header>
  );
};
