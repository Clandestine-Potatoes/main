// import { useState } from "react";
// import { setUserAbout } from "../firestore.firebase";
// import type { AboutData } from "../firestore.firebase";

// export default function useAbout() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSuccess, setIsSuccess] = useState(false);

//   function trigger(formData: AboutData) {
//     setIsLoading(true);
//     setUserAbout(formData)
//       .then(() => setIsSuccess(true))
//       .catch((error) => setError(error))
//       .finally(() => setIsLoading(false));
//   }
//   return [trigger, { isSuccess, isLoading, error }];
// }
