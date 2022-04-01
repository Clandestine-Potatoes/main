import {
  doc,
  DocumentData,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import firebase from "./firebase";

const db = getFirestore(firebase);

// TS comverter
function fsTypeConverter<D>(doc: D) {
  return {
    toFirestore(doc: D): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): D {
      return snapshot.data() as D;
    },
  };
}

// DAO
export function addDoc<T>(path: string, data: T): Promise<void> {
  const converter = fsTypeConverter<T>(data);
  return setDoc(doc(db, path).withConverter(converter), data);
}

export function updateDoc() {}

export function getDoc() {}

export function getDocs() {}

export function deleteDoc() {}

// Services
export type AboutData = {
  name: string;
  email: string;
  birthday: Date;
  identify: "male" | "female" | "non-binary";
  bio: string;
};

export function setUserAbout(aboutData: AboutData): Promise<void> {
  return addDoc<AboutData>("users", aboutData);
}
