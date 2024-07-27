import { Box, Typography, styled } from "@mui/material";
import {
  LocationOn,
  SettingsBrightness,
  Opacity,
  Brightness5,
  Brightness6,
  Dehaze,
  Cloud,
  WindPower,
} from "@mui/icons-material";

const Row = styled(Typography)({
  padding: 10,
  fontSize: 20,
  letterSpacing: 2,
  "& > svg": {
    marginRight: 10,
  },
});

const Error = styled(Typography)({
  color: "red",
  margin: 50,
  padding: 20,
});

const Information = ({ result }) => {
  if (!result || Object.keys(result).length === 0) {
    return <Error>Hii Ela !! Enter a city</Error>;
  }

  const {
    main: { temp, humidity },
    sys: { sunrise, sunset },
    weather,
    clouds: { all: cloudiness },
    wind: { speed: windSpeed },
  } = result;

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
  const weatherDescription = weather ? weather[0].main : "Unknown";

  return (
    <Box style={{ margin: "30px 60px" }}>
      <Row>
        <LocationOn />
        Location: {result.name}
        {result.sys && result.sys.country ? `, ${result.sys.country}` : null}
      </Row>
      <Row>
        <SettingsBrightness />
        Temperature: {temp}° C
      </Row>
      <Row>
        <Opacity />
        Humidity: {humidity}
      </Row>
      <Row>
        <Brightness5 />
        Sun Rise: {sunriseTime}
      </Row>
      <Row>
        <Brightness6 />
        Sun Set: {sunsetTime}
      </Row>
      <Row>
        <Dehaze />
        Weather: {weatherDescription}
      </Row>
      <Row>
        <Cloud />
        Clouds: {cloudiness}%
      </Row>
      <Row>
        <WindPower /> Wind Speed: {windSpeed} Km/h
      </Row>
    </Box>
  );
};

export default Information;
