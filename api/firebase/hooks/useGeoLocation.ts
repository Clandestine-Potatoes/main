import { useState } from "react";
import useAuth from "../../../contexts/auth-context/useAuth";
import { updateLocation } from "../firestore.firebase";
import axios from "axios";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSucess] = useState(false);

  const { user: appUser } = useAuth();

  function trigger() {
    if (!appUser) {
      return;
    }
    setIsLoading(true);
    axios
      .post(
        "http://localhost:5001/clandestine-potatoes/us-central1/getGeolocation"
      )
      .then((result) => {
        updateLocation(appUser.uid, result.data).then(() => {
          setIsSucess(true);
        });
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  }

  return [trigger, { isSuccess, isLoading, error }];
}
