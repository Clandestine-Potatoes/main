// TODO: export from auth.firebase.ts
import { useState } from "react";
import useAuth from "../../../contexts/auth-context/useAuth";
import { signIn } from "../auth.firebase";

export default function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { setUser } = useAuth();

  function trigger(email: string, password: string) {
    setIsLoading(true);
    signIn(email, password)
      .then((authUser) => {
        setUser(authUser);
        setIsSuccess(true);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  return [trigger, { isSuccess, isLoading, error }];
}
