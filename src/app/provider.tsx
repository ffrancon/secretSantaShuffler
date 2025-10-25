import { type ReactNode, useMemo, useReducer } from "react";
import { cachedReducer } from "@/context";
import { SecretSantaContext } from "@/context";
import { restoreStateFromCache } from "@/app/cache";

export const Provider = ({ children }: { children: ReactNode }) => {
  const restoredState = useMemo(() => restoreStateFromCache(), []);

  const [state, dispatch] = useReducer(cachedReducer, restoredState);

  return (
    <SecretSantaContext.Provider value={{ state, dispatch }}>
      {children}
    </SecretSantaContext.Provider>
  );
};
