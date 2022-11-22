import React, { useState, useEffect, useRef } from "react";
import styles from "./WeatherWidget.module.scss";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";
import useFetch from "../hooks/useFetch.js";
import useToggleOnOutsideClick from "../hooks/useToggleOnOutsideClick.jsx";
import RevalidateWeather from "./RevalidateWeather.jsx";
import DisplayWeatherIcons from "./DisplayWeatherIcons.jsx";
import { fixTemperatureDisplay } from "../utils/formatData.js";

const url = "https://live-weather.deno.dev";
const citiesListUrl = "/get-cities";

const WeatherWidget = ({ toggle, setToggle }) => {
  const [city, setCity] = useState("Cracow");
  const [checkbox, setCheckbox] = useState(false);
  const [revalidatedPrecipitation, setRevalidatedPrecipitation] =
    useState(null);
  const ref = useRef();
  useToggleOnOutsideClick(ref, toggle, setToggle);

  const cityUrl = `/city?${city}`;

  const {
    data: initialWeatherData,
    loading: initialWeatherLoading,
    error: initialWeatherError,
  } = useFetch(url + cityUrl);
  const {
    data: cityData,
    loading: loadingCity,
    error: errorCity,
  } = useFetch(url + citiesListUrl, false);

  const handleSubmitCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmitCheckbox = () => {
    console.log("checkbox", !checkbox);
  };

  if (initialWeatherLoading) {
    return <p>loading...</p>;
  }

  if (initialWeatherError) {
    return <p>error</p>;
  }

  const fixedInitialWeatherData = fixTemperatureDisplay(
    initialWeatherData.temperature
  );

  return (
    <div ref={ref} className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <div className={styles.info}>
            <h4>{city}</h4>
            <h4>
              {checkbox ? (
                <RevalidateWeather
                  url={url}
                  cityUrl={cityUrl}
                  fixedInitialWeatherData={fixedInitialWeatherData}
                  setRevalidatedPrecipitation={setRevalidatedPrecipitation}
                  checkbox={checkbox}
                />
              ) : (
                fixedInitialWeatherData
              )}
              &deg;
            </h4>
          </div>
          <div className={styles.icons}>
            <DisplayWeatherIcons
              InitialWeatherPrecipitation={initialWeatherData.precipitation}
              revalidatedPrecipitation={revalidatedPrecipitation}
              checkbox={checkbox}
            />
          </div>
        </div>
        {!loadingCity && !initialWeatherError && !errorCity && (
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

export default WeatherWidget;
