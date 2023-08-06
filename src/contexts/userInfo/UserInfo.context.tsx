import React, { createContext, useReducer } from "react";
import {
  UserState,
  Dispatch,
  initialState,
  UserReducer,
} from "./UserInfo.reducer";

export const UserContext =
  createContext<{ state: UserState; dispatch: Dispatch } | undefined>(
    undefined
  );

UserContext.displayName = "UserContext";

type UserContextType = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextType) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
