import React, { createContext, useReducer } from "react";
import {
  RegisterationState,
  Dispatch,
  initialState,
  RegistrationReducer,
} from "./Registration.reducer";

export const RegistrationContext =
  createContext<{ state: RegisterationState; dispatch: Dispatch } | undefined>(
    undefined
  );

RegistrationContext.displayName = "RegistrationContext";

type RegistrationContextType = {
  children: React.ReactNode;
};

export const RegistraionContextProvider = ({
  children,
}: RegistrationContextType) => {
  const [state, dispatch] = useReducer(RegistrationReducer, initialState);
  const value = { state, dispatch };
  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
