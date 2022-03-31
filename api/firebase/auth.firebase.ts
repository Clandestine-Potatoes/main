import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "./firebase";

const auth = getAuth(firebase);

const provider = new GoogleAuthProvider();
