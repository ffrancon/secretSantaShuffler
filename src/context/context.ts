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

export const useGetState = () => {
  const context = useContext(SecretSantaContext);
  return context.state;
};

export const useGetDispatch = () => {
  const context = useContext(SecretSantaContext);
  return context.dispatch;
};
