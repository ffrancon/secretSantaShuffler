import { type ReactNode, useReducer } from "react";
import { reducer } from "@/context";
import { initialState, SecretSantaContext } from "@/context";

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SecretSantaContext.Provider value={{ state, dispatch }}>
      {children}
    </SecretSantaContext.Provider>
  );
};
