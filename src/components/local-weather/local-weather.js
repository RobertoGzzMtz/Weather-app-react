import { useState, useEffect } from "react";
import { WEATHER_API_URL, API_KEY } from "../../api";
import CurrentWeather from "../current-weather/current-weather";

const LocalWeather = () => {
  const [lat, setLat] = useState([]);
  const [lon, setLong] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setTimeout(() => {
       navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }, 100 );
      const request = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      
      const res = await request.json();
      
      setData(res);
      console.log("!!!", res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [lat, lon]);

  return (
    <div className="App">
      {typeof data.main !== "undefined" ? (
        <CurrentWeather data={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LocalWeather;
