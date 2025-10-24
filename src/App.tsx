import { SecretSantaContextProvider } from "./context/provider";
import { Header } from "./ui/components/Header/Header";
import { Pairs } from "./ui/components/Pairs/Pairs";
import { Players } from "./ui/components/Players/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen bg-neutral-200 bg-gradient-to-r p-4 text-sm text-neutral-700">
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
