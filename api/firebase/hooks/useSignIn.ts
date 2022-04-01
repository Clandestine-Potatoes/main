// TODO: export from auth.firebase.ts
import { User } from "firebase/auth";
import { useState } from "react";
import useAuth from "../../../contexts/auth-context/useAuth";
import { signIn } from "../auth.firebase";

export default function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<User | null>(null);

  const { setUser } = useAuth();

  function trigger(email: string, password: string) {
    setIsLoading(true);
    signIn(email, password)
      .then((user) => {
        setUser(user);
        setData(user);
        // TODO: Add auth user info to db
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }

  return [trigger, { data, isLoading, error }];
}
