export const Pair = ({
  pair: [giver, receiver],
}: {
  pair: [string, string];
}) => (
  <div className="flex items-center justify-between rounded border border-gray-300 px-2 py-3">
    <p>
      <span className="font-semibold">{giver}</span>
      {" gives to "}
      <span className="font-semibold">{receiver}</span>
    </p>
  </div>
);
