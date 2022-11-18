import React, { useState, useEffect, useRef } from "react";
import styles from "./GetWeather.module.scss";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";
import useFetch from "../hooks/useFetch.js";
import useToggleOnOutsideClick from "../hooks/useToggleOnOutsideClick.jsx";
import IntervalData from "./IntervalData.jsx";
import DisplayWeatherIcons from "./DisplayWeatherIcons.jsx";

const url = "https://live-weather.deno.dev";
const getCities = "/get-cities";

const GetWeather = ({ toggle, setToggle }) => {
  const [city, setCity] = useState("Cracow");
  const [checkbox, setCheckbox] = useState(false);
  const [intervalPre, setIntervalPre] = useState(null);
  const ref = useRef();
  useToggleOnOutsideClick(ref, toggle, setToggle);

  const cityUrl = `/city?${city}`;

  const {
    data: weatherData,
    loading: loadingWeather,
    error: errorWeather,
  } = useFetch(url + cityUrl);
  const {
    data: cityData,
    loading: loadingCity,
    error: errorCity,
  } = useFetch(url + getCities, false);

  const handleSubmitCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmitCheckbox = () => {
    console.log("checkbox", !checkbox);
  };

  const getIntervalWeatherPre = (intervalPre) => {
    setIntervalPre(intervalPre);
  };

  if (loadingWeather) {
    return <p>loading...</p>;
  }

  if (errorWeather) {
    return <p>error</p>;
  }

  const fixedWeatherData = Number.parseFloat(weatherData.temperature).toFixed(
    1
  );

  return (
    <div ref={ref} className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <div className={styles.info}>
            <h4>{city}</h4>
            <h4>
              {checkbox ? (
                <IntervalData
                  url={url}
                  cityUrl={cityUrl}
                  fixedWeatherData={fixedWeatherData}
                  getIntervalWeatherPre={getIntervalWeatherPre}
                />
              ) : (
                fixedWeatherData
              )}
              &deg;
            </h4>
          </div>
          <div className={styles.icons}>
            <DisplayWeatherIcons
              weatherDataPre={weatherData.precipitation}
              intervalPre={intervalPre}
              checkbox={checkbox}
            />
          </div>
        </div>
        {!loadingCity && !errorWeather && !errorCity && (
          <div className={styles.extraFeatures}>
            <form onChange={handleSubmitCity}>
              <select name="cities">
                <option value="" hidden={true}>
                  Cracow
                </option>
                {cityData.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </form>
            <form onChange={handleSubmitCheckbox}>
              <input
                type="checkbox"
                id="check"
                onChange={() => setCheckbox((prevState) => !prevState)}
              />
              <label htmlFor="check">Refresh weather every 30s</label>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetWeather;
