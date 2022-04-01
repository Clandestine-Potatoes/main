import * as functions from "firebase-functions";
import axios from "axios";
import config from "../../../../config";
const admin = require("firebase-admin");
admin.initializeApp();

exports.getGeolocation = functions.https.onRequest(async (req, res) => {
  try {
    const result = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${config.geolocationApiKey}`
    );
    res.send(result.data.location);
  } catch (err) {
    console.log("error");
  }
});
