import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import firebase from "./firebase";

export const auth = getAuth(firebase);

export function signUp(email: string, password: string): Promise<User> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      throw new Error(error);
    });
}

export function signIn(email: string, password: string): Promise<User> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      throw new Error(error);
    });
}

export function signOut() {
  return authSignOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
