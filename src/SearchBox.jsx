import { useState } from "react"; // Importing the useState hook from React
import TextField from "@mui/material/TextField"; // Importing the TextField component from Material-UI
import Button from "@mui/material/Button"; // Importing the Button component from Material-UI
import "./SearchBox.css"; // Importing the CSS file for styling

export default function SearchBox({ updateinfo }) {
  // Initializing state for city input and error handling
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  // API URL and key for fetching weather data
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "f8373e4112767456c9f80f210e0b7dc6";

  // Function to fetch weather data from the API
  let getWeather = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      let jsonResponse = await response.json();
      console.log(jsonResponse);

      // Creating a result object with relevant weather data
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  // Function to handle input change
  let handleChange = (e) => {
    setCity(e.target.value);
    setError(false);
  };

  // Function to handle form submission
  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(city);
      getWeather(city);
      setCity("");
      let newInfo = await getWeather();
      updateinfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <h3>Search for the Weather</h3>
      <form onSubmit={handleSubmit}>
        {/* Input field for city name */}
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        {/* Submit button */}
        <Button variant="contained" type="submit">
          Send
        </Button>
        {/* Error message */}
        {error && <p>No such place exist in our API :( </p>}
      </form>
    </div>
  );
}