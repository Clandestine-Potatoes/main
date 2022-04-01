import React, { FC } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User as AuthUser } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../../api/firebase/auth.firebase";
import { getUser } from "../../api/firebase/firestore.firebase";
import { IAbout, IAppUser, TInterests } from "../../api/firebase/types";

class AppUser implements IAppUser {
  uid: string;
  email: string;
  about: IAbout | undefined;
  interests: TInterests | undefined;
  location: string | undefined;

  constructor(authUser: AuthUser) {
    this.uid = authUser.uid;
    this.email = authUser.email as string;
    this.init();
  }

  async init() {
    const data = getUser(this.uid).then((data) => {
      this.about = data?.about;
      this.interests = data?.interests;
      this.location = data?.location;
    });
  }
}

const AuthProvider: FC = ({ children }) => {
  const [appUser, setAppUser] = useState<IAppUser | null>(null);

  useEffect(() => {
    // Check firebase for if the user is still logged in with a valid token and set locally
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAppUser(new AppUser(authUser));
      } else {
        setAppUser(null);
      }
    });

    return unsubscribe();
  }, []);

  function setUser(authUser: AuthUser) {
    setAppUser(new AppUser(authUser));
  }

  function removeUser() {
    setAppUser(null);
  }

  return (
    <AuthContext.Provider value={{ appUser, setUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
