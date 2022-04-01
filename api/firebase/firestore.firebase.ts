import { User } from "firebase/auth";
import {
  addDoc,
  updateDoc as fsUpdate,
  collection,
  doc,
  DocumentData,
  DocumentReference,
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
export function createDocCustomId<T>(
  path: string,
  data: T,
  id: string
): Promise<void> {
  return setDoc(doc(db, path, id), data).catch((err) => {
    throw new Error(err);
  });
}

export function createDocAutoId<T>(path: string, data: T) {
  const converter = fsTypeConverter<T>(data);
  return addDoc(collection(db, path).withConverter(converter), data).catch(
    (err) => {
      throw new Error(err);
    }
  );
}

export function updateDoc<T>(path: string, data: T, id: string): Promise<void> {
  return fsUpdate(doc(db, path, id), data).catch((err) => {
    throw new Error(err);
  });
}

export function getDoc() {}

export function getDocs() {}

export function deleteDoc() {}

// Services
export function createNewUserDoc(user: User) {
  const { uid, email } = user;
  return createDocCustomId<{ email: string | null }>("users", { email }, uid);
}

export function updateUserAbout(user: User, data: Partial<AboutData>) {
  const { uid } = user;
  return updateDoc<Partial<AboutData>>("user", data, uid);
}

// export function setUserAbout(aboutData: AboutData): Promise<void> {
//   return addDoc<AboutData>("users", aboutData);
// }

// export function setUserInterests(interestData: Array<string>) {
//   return addDoc;
// }

// Types
export type AboutData = {
  name: string;
  email: string;
  birthday: Date;
  identify: "male" | "female" | "non-binary";
  bio: string;
};
