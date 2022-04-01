import React, { FC } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "./AuthContext";
import firebase from "../../api/firebase/firebase";
import { auth } from "../../api/firebase/auth.firebase";

const AuthProvider: FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    // Check firebase for if the user is still logged in with a valid token and set locally
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return unsubscribe();
  }, []);

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
