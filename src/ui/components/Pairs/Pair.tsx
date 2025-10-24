export const Pair = ({
  pair: [giver, receiver],
}: {
  pair: [string, string];
}) => (
  <div className="flex justify-between items-center px-2 py-3 border border-gray-300 rounded">
    <p>
      <span className="font-semibold">{giver}</span>
      {" gives to "}
      <span className="font-semibold">{receiver}</span>
    </p>
  </div>
);
