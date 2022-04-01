import { useState } from "react";
import { signUp } from "../auth.firebase";
import { createNewUserDoc } from "../firestore.firebase";
import useAuth from "../../../contexts/auth-context/useAuth";

export default function useSignUp(): [
  (email: string, password: string) => void,
  { isSuccess: boolean; isLoading: boolean; error: any }
] {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useAuth();

  function trigger(email: string, password: string) {
    // Create user in firebase auth -> Add user to database -> Add user to AuthContext
    // NOTE: Make sure this sets the user as logged in in FB
    setIsLoading(true);
    signUp(email, password)
      .then((authUser) => {
        const { uid, email } = authUser;
        return createNewUserDoc(uid, email as string).then(() => {
          setUser(authUser)
        }
        );
      })
      .then(() => setIsSuccess(true))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }
  return [trigger, { isSuccess, isLoading, error }];
}
