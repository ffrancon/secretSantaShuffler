import { SecretSantaContextProvider } from "./context/provider";
import { Pairs } from "./ui/components/Pairs/Pairs";
import { Players } from "./ui/components/Players/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen p-4 bg-gradient-to-r bg-neutral-200 text-neutral-700 text-sm">
        <div className="w-[80vw] max-w-[1024px] mx-auto grid grid-cols-2 gap-3">
          <Players />
          <Pairs />
        </div>
      </div>
    </SecretSantaContextProvider>
  );
}

export default App;
