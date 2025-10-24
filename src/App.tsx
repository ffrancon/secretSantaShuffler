import { SecretSantaContextProvider } from "./context/provider";
import { Pairs } from "./ui/components/Pairs/Pairs";
import { Players } from "./ui/components/Players/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="grid grid-cols-[400px_400px] gap-4">
          <Players />
          <Pairs />
        </div>
      </div>
    </SecretSantaContextProvider>
  );
}

export default App;
