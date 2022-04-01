import { useState } from "react";
import useAuth from "../../../contexts/auth-context/useAuth";
import { updateLocation } from "../firestore.firebase";
import axios from "axios";
import config from "../../config";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSucess] = useState(false);

  const { appUser } = useAuth();

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
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${result.data.latitude},${result.data.longitude}&result_type=administrative_area_level_2&key=${config.geocodingApiKey}`
          )
          .then((result) => {
            const city = result.data.results[0].address_components[0].long_name;
            updateLocation(appUser.uid, city).then(() => {
              setIsSucess(true);
            });
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
