import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import LocalWeather from "./components/local-weather/local-weather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setforcastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const weatherForcastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, weatherForcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        console.log(searchData);

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setforcastWeather({ city: searchData.label, ...forcastResponse });
      })
      .catch((error) => {
        setCurrentWeather(null);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather === null || !currentWeather ? (
        <LocalWeather />
      ) : (
        <div>
          <CurrentWeather data={currentWeather} />
          <Forecast data={forcastWeather} />
        </div>
      )}
    </div>
  );
}

export default App;
