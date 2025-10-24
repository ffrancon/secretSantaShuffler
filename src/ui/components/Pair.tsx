export const Pair = ({
  pair: [giver, receiver],
}: {
  pair: [string, string];
}) => (
  <div className="h-[50px] flex justify-between items-center my-2 p-2 border border-gray-300 rounded">
    <p>
      <strong>{giver}</strong> ➡️ <strong>{receiver}</strong>
    </p>
  </div>
);
