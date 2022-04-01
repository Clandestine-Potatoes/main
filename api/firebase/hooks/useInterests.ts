import { useState } from "react";
import { updateUserInterests } from "../firestore.firebase";
import useAuth from "../../../contexts/auth-context/useAuth";
import type { TInterests } from "../types";

export default function useSignUp() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { appUser } = useAuth();

  function trigger(data: { interests: TInterests }) {
    if (!appUser) {
      throw new Error("No authenticated user.");
    }
    setIsLoading(true);
    updateUserInterests(appUser.uid, data)
      .then(() => setIsSuccess(true))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }
  return [trigger, { isSuccess, isLoading, error }];
}
