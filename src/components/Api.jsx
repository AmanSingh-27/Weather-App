import axios from "axios";

const API_KEY = "d4824047b25359603b8ea4c14abbc92a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city, country) => {
  try {
    let response = await axios.get(
      `${API_URL}?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "City not found. Please enter a valid city name." };
    } else {
      return { error: "An error occurred. Please try again later." };
    }
  }
};
