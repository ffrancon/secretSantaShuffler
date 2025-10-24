import { SecretSantaContextProvider } from "./context/provider";
import { Header } from "./ui/components/Header/Header";
import { Pairs } from "./ui/components/Pairs/Pairs";
import { Players } from "./ui/components/Players/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-sm text-slate-200">
        <Header />
        <div className="mx-auto grid w-[80vw] max-w-[1024px] grid-cols-2 gap-3">
          <Players />
          <Pairs />
        </div>
      </div>
    </SecretSantaContextProvider>
  );
}

export default App;
