import { GeoPoint as IGeoPoint } from "firebase/firestore";

export { GeoPoint as IGeoPoint } from "firebase/firestore";
export { User as IAuthUser } from "firebase/auth";

export interface IAppUser {
  uid: string;
  email: string;
  about: IAbout | undefined;
  interests: TInterests | undefined;
  location: IGeoPoint | undefined;
}

export interface IAbout {
  name: string | undefined;
  age: number | undefined;
  identity: string | undefined;
  bio: string | undefined;
}

export type TInterests = Array<string>;

export interface IGeoLocation {
  latitude: number;
  longitude: number;
}
