import { User } from "firebase/auth";
import React from "react";
import { IAppUser, IAuthUser } from "../../api/firebase/types";

export type TAuthContext = {
  appUser: IAppUser | null;
  setUser: (user: IAuthUser) => void;
  removeUser: () => void;
};
export default React.createContext<TAuthContext | undefined>(undefined);
