import { useState } from "react";
import useAuth from "../../../contexts/auth-context/useAuth";
import { getUsersByLocation } from "../firestore.firebase";
import { IAppUser } from "../types";

export default function useSignUp(): [
  () => void,
  {
    data: Array<IAppUser> | null;
    isSuccess: boolean;
    isLoading: boolean;
    error: any;
  }
] {
  const [data, setData] = useState<Array<IAppUser> | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const { appUser } = useAuth();

  function trigger() {
    if (!appUser) {
      setError("User  does not exist");
      return;
    }

    if (!appUser.location) {
      setError("User does not have location set.");
      return;
    }

    setIsLoading(true);
    getUsersByLocation(appUser.location)
      .then((appUsersSnap) => {
        let appUsers: Array<IAppUser> = [];
        appUsersSnap.forEach((appUser) => appUsers.push(appUser.data()));
        appUsers.filter((doc) => doc.uid !== appUser.uid);
        setData(appUsers);
        setIsSuccess(true);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }
  return [trigger, { data, isSuccess, isLoading, error }];
}
