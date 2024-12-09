import SearchBox from "./SearchBox"; // Importing the SearchBox component
import InfoBox from "./InfoBox"; // Importing the InfoBox component
import { useState } from "react"; // Importing the useState hook from React

export default function WeatherApp() {
  // Initializing state for weather information with default values
  const [weatherInfo, setWeatherInfo] = useState({
    city: "-",
    feelslike: "-",
    temp: "-",
    tempMin: "-",
    tempMax: "-",
    humidity: "-",
    weather: "-",
  });

  // Function to update the weather information state
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="WeatherApp">
      <h2>Weather App</h2>
      {/* Passing the updateInfo function to the SearchBox component */}
      <SearchBox updateinfo={updateInfo} />
      {/* Passing the weatherInfo state to the InfoBox component */}
      <InfoBox info={weatherInfo} />
    </div>
  );
}