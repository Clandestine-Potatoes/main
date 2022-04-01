import { useState } from "react";
// import useAuth from "../../../contexts/auth-context/useAuth";
import { updateLocation } from "../firestore.firebase";
import axios from "axios";
import config from "../../config";

export default function useGeoLocation(): [
  (uid: string) => void,
  {
    location: string | null;
    isSuccess: boolean;
    isLoading: boolean;
    error: any;
  }
] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSucess] = useState(false);
  const [location, setLocation] = useState(null);

  // const { appUser } = useAuth();

  function trigger(uid: string) {
    // if (!appUser) {
    //   return;
    // }
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
            setLocation(city);
            updateLocation(uid, city).then(() => {
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

  return [trigger, { location, isSuccess, isLoading, error }];
}
