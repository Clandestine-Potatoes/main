import * as functions from "firebase-functions";
import axios from "axios";
const admin = require("firebase-admin");
admin.initializeApp();

exports.getGeolocation = functions.https.onRequest(async (req, res) => {
  try {
    const result = await axios.post(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCq5w9xn0CsZTOBZRAnR78KRTOHBeEYGtE"
    );
    res.send(result.data);
  } catch (err) {
    console.log("error");
  }
});
