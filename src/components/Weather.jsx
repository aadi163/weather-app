import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=80d66ddb69604aab9719f91319545632&include=minutely&city=${city}&country=${country}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const cityInputChange = (e) => {
    setCity(e.target.value);
  };
  const countryInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={cityInputChange}
        />
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={countryInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <div>
          {weatherData.data.map((item, index) => (
            <div key={index}>
              <h2>
                {item.city_name}, {item.country_code}
              </h2>
              <p>Temperature: {item.app_temp}°C</p>
              <p>AQI: {item.aqi}</p>
              <p>Cloudiness: {item.clouds}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default Weather;
