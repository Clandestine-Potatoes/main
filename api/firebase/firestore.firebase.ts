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
  getDocs,
  GeoPoint,
  query,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { string } from "yup";
import firebase from "./firebase";
import type { IAbout, IAppUser, TInterests, TGeoCode } from "./types";

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
    console.log("err: ", err);
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

export function getDocsByField<T>(path: string, filter: QueryConstraint) {
  const converter = fsTypeConverter<T>();
  const colRef = collection(db, path);
  const q = query(colRef, filter).withConverter(converter);
  return getDocs(q);
}

/*

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});



*/

export function deleteDoc() {}

// Services
export function createNewUserDoc(uid: string, email: string) {
  return createDocCustomId<{ uid: string; email: string }>(
    COLLECTIONS.USERS,
    { uid, email },
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
export function updateLocation(uid: string, location: TGeoCode) {
  return updateDoc<TGeoCode>(COLLECTIONS.USERS, location, uid);
}

export function getUsersByLocation(location: string) {
  const filter = where("location", "==", location);
  return getDocsByField<IAppUser>(COLLECTIONS.USERS, filter);
}
