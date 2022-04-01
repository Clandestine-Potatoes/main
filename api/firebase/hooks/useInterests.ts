import { useState } from "react";
import { updateUserInterests } from "../firestore.firebase";
import type { InterestData } from "../firestore.firebase";
import useAuth from "../../../contexts/auth-context/useAuth";

export default function useSignUp() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  function trigger(data: InterestData) {
    if (!user) {
      throw new Error("No authenticated user.");
    }
    setIsLoading(true);
    updateUserInterests(user, data)
      .then(() => setIsSuccess(true))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }
  return [trigger, { isSuccess, isLoading, error }];
}
