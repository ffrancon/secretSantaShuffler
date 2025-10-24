import { SecretSantaContextProvider } from "./context/provider";
import { Players } from "./ui/components/Players";

function App() {
  return (
    <SecretSantaContextProvider>
      <div className="min-h-screen p-4 bg-gray-100">
        <Players />
      </div>
    </SecretSantaContextProvider>
  );
}

export default App;
