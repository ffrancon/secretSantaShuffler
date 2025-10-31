import { type ReactNode, useMemo, useReducer } from "react";

import { restoreStateFromCache } from "@/app/cache";
import { SecretSantaContext } from "@/app/context";
import { cachedReducer } from "@/app/reducer";

export const Provider = ({ children }: { children: ReactNode }) => {
  const restoredState = useMemo(() => restoreStateFromCache(), []);

  const [state, dispatch] = useReducer(cachedReducer, restoredState);

  return (
    <SecretSantaContext.Provider value={{ state, dispatch }}>
      {children}
    </SecretSantaContext.Provider>
  );
};
