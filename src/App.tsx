import { SecretSantaContextProvider } from "./context/provider";
import { Pairs } from "./ui/components/Pairs/Pairs";
import { Players } from "./ui/components/Players/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen p-4 bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200">
        <div className="w-5xl mx-auto grid grid-cols-[400px_400px] gap-2 bg-slate-600 p-4 rounded-lg shadow-md border border-slate-500">
          <Players />
          <Pairs />
        </div>
      </div>
    </SecretSantaContextProvider>
  );
}

export default App;
