import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
} from "firebase/auth";
import firebase from "./firebase";
import type { IAuthUser } from "./types";

export const auth = getAuth(firebase);

export function signUp(email: string, password: string): Promise<IAuthUser> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      throw new Error(error);
    });
}

export function signIn(email: string, password: string): Promise<IAuthUser> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      throw new Error(error);
    });
}

export function signOut() {
  return authSignOut(auth)
    .then(() => {
      // NOTE: AuthProvider will cause re-render and this should navigate the user to the
      //    login screen.
    })
    .catch((error) => {
      // An error happened.
    });
}
