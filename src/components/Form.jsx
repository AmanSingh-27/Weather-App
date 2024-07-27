import { Box, Button, Input, styled } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { getWeather } from "./Api";

const Container = styled(Box)({
  background: "#445A6F",
  padding: 10,
});

const Form = ({ setResult }) => {
  const [data, setData] = useState({ city: "", country: "" });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${data.city}&type=like&sort=population&appid=d4824047b25359603b8ea4c14abbc92a`
        );
        const cities = response.data.list.map((city) => city.name);
        setSuggestions(cities);
      } catch (error) {
        console.log(error);
      }
    }

    if (data.city.length >= 3) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [data.city]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSuggestionClick = (suggestion) => {
    setData({ ...data, city: suggestion });
    setSuggestions([]);
  };

  const getWeatherInfo = async () => {
    let response = await getWeather(data.city, data.country);
    console.log(response);
    if (response.error) {
      setResult(response.error);
    } else {
      setResult(response);
    }
  };

  return (
    <Container className="">
      <Input
        placeholder="City"
        sx={{
          color: "#FFF",
          marginRight: "20px",
          fontSize: "16px",
        }}
        onChange={(e) => handleChange(e)}
        name="city"
        value={data.city}
        autoComplete="off"
        list="city-suggestions"
      />
      {suggestions.length > 0 && data.city.length >= 3 && (
        <datalist id="city-suggestions">
          {suggestions.map((suggestion) => (
            <option
              key={suggestion}
              value={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            />
          ))}
        </datalist>
      )}
      {/* <Input
        placeholder="Country"
        sx={{
          color: "#FFF",
          marginRight: "20px",
          fontSize: "16px",
        }}
        onChange={(e) => handleChange(e)}
        name="country"
        value={data.country}
      /> */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#e67e22",
          color: "#FFFF",
          marginLeft: "14rem",
        }}
        onClick={() => getWeatherInfo()}
      >
        Get weather
      </Button>
      {suggestions.length > 0 && data.city.length >= 3 && (
        <div>
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Form;
