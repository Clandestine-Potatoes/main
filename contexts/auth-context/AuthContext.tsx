import { User } from "firebase/auth";
import React from "react";

export type TAuthContext = {
  setUser: (user: User) => void;
  removeUser: () => void;
};
export default React.createContext<TAuthContext | undefined>(undefined);
