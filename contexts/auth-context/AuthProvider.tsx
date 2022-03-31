import { User } from "firebase/auth";
import React, { FC } from "react";
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  function setUser(user: User) {
    setAuthUser(user);
  }

  function removeUser() {
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ user: authUser, setUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
