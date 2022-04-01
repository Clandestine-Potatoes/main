export { User as IAuthUser } from "firebase/auth";

export interface IAppUser {
  uid: string;
  email: string;
  about: IAbout | undefined;
  interests: TInterests | undefined;
  location: string | undefined;
}

export interface IAbout {
  name: string | undefined;
  age: number | undefined;
  identity: string | undefined;
  bio: string | undefined;
}

export type TInterests = Array<string>;

export type TGeoCode = string;
