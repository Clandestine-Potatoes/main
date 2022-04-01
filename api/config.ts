import * as dotenv from "dotenv";

dotenv.config();

const config = {
  geolocationApiKey: process.env.GEOLOCATION_API_KEY,
  geocodingApiKey: process.env.GEOCODING_API_KEY,
};

export default config;
