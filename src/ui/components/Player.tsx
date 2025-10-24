export const Player = ({
  player,
  remove,
}: {
  player: string;
  remove: () => void;
}) => {
  return (
    <div className="flex justify-between items-center my-2 p-2 border border-gray-300 rounded">
      <p>{player}</p>
      <button
        role="button"
        onClick={remove}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};
