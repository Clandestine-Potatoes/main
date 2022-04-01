import {
  addDoc,
  updateDoc as fsUpdate,
  collection,
  doc,
  DocumentData,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
  getDoc,
  GeoPoint,
} from "firebase/firestore";
import firebase from "./firebase";
import type { IAbout, IAppUser, TInterests, IGeoLocation } from "./types";

const db = getFirestore(firebase);

const COLLECTIONS = {
  USERS: "users",
  MATCHES: "matches",
};

// TS converter
function fsTypeConverter<D>(doc?: D) {
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

export function getDocById<T>(path: string, id: string) {
  const converter = fsTypeConverter<T>();
  return getDoc(doc(db, path, id).withConverter(converter)).then((snap) =>
    snap.exists() ? snap.data() : undefined
  );
}

export function getDocs() {}

export function deleteDoc() {}

// Services
export function createNewUserDoc(uid: string, email: string) {
  return createDocCustomId<{ email: string | null }>(
    COLLECTIONS.USERS,
    { email },
    uid
  );
}

export function updateUserAbout(uid: string, data: Partial<IAbout>) {
  return updateDoc<Partial<IAbout>>(COLLECTIONS.USERS, data, uid);
}

export function updateUserInterests(
  uid: string,
  data: { interests: TInterests }
) {
  return updateDoc<{ interests: TInterests }>(COLLECTIONS.USERS, data, uid);
}

export function getUser(uid: string) {
  // TODO: This should be of type AppUser
  return getDocById<IAppUser>(COLLECTIONS.USERS, uid);
}
export function updateLocation(uid: string, location: IGeoLocation) {
  const loc = new GeoPoint(location.latitude, location.longitude);
  return updateDoc<GeoPoint>(COLLECTIONS.USERS, loc, uid);
}
