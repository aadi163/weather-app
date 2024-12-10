import React, { useState } from "react";
import "./Weather.css";
import weatherLogo from "../assets/weather.png";
import searchIcon from "../assets/search-icon.png";
import DateObject from "react-date-object";
import Countries from "../assets/Countries.json";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  let date = new DateObject();
  let currentDate = date.format("dddd DD MMMM");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?key=80d66ddb69604aab9719f91319545632&city=${city}&country=${country}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cityInputChange = (e) => {
    setCity(e.target.value);
  };
  const countryInputChange = (e) => {
    setCountry(e.target.value);
  };

  const searchData = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <div className="form">
        <img src={weatherLogo} alt="" />
        <form>
          <select onChange={countryInputChange} defaultValue={"IN"}>
            {Countries.map((data) => (
              <option value={data.isoCode}>
                <img src={data.flag} alt="image" />
                {data.isoCode}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="please enter your location "
            value={city}
            onChange={cityInputChange}
            className="input-field"
          />
        </form>
        <span onClick={searchData} className="button">
          <img src={searchIcon} alt="" />
        </span>
      </div>
      {weatherData ? (
        <div>
          <div className="current-weather">
            {currentDate}
            <h1>
              {weatherData.data[0].temp}
              <sup>°C</sup>
            </h1>
            {weatherData.city_name},{weatherData.country_code}
          </div>
          <div className="weather-info">
            {weatherData.data.slice(0, 7).map((data, index) => (
              <div key={index}>
                <div>
                  {new Date(data.valid_date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </div>
                <span>
                  {data.temp}
                  <sup>°C</sup>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="weather-animation"></div>
      )}
    </div>
  );
};
export default Weather;
