export const Pair = ({
  pair: [giver, receiver],
}: {
  pair: [string, string];
}) => (
  <div className="flex items-center justify-between px-2 py-3">
    <p>
      <span className="font-semibold">{giver}</span>
      {" gives "}
      <span className="font-semibold">{receiver}</span>
      {" a 🎁"}
    </p>
  </div>
);
