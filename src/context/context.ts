import { type ActionDispatch, createContext, useContext } from "react";
import { type State } from "./types";
import { type Action } from "./reducer";

export const initialState: State = {
  players: [],
  pairs: [],
};

type SecretSantaContextType = {
  state: State;
  dispatch: ActionDispatch<[action: Action]>;
};
export const SecretSantaContext = createContext<SecretSantaContextType>({
  state: initialState,
  dispatch: () => {},
});

export const useSecretSantaCtx = () => {
  const context = useContext(SecretSantaContext);
  if (!context) {
    throw new Error(
      "useSecretSantaCtx must be used within SecretSantaContextProvider"
    );
  }
  return context;
};
