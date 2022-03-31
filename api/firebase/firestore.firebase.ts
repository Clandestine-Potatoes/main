import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase from "./firebase";

const db = getFirestore(firebase);

export function addDoc<T>(path: string, data: T) {
  setDoc(doc(db, path), data);
}

export function updateDoc() {}

export function getDoc() {}

export function getDocs() {}

export function deleteDoc() {}
