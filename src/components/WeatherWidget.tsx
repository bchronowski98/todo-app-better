import React, { useState, useEffect, useRef } from "react";
import styles from "./WeatherWidget.module.scss";
import useFetch from "../hooks/useFetch";
import useToggleOnOutsideClick from "../hooks/useToggleOnOutsideClick";
import DisplayWeatherIcons from "./DisplayWeatherIcons.tsx";
import { fixTemperatureDisplay } from "../utils/formatData.js";
import { database, updateCheckbox, updateCity } from "../idb/idb";

const url = "https://live-weather.deno.dev";
const citiesListUrl = "/get-cities";

const REVALIDATE_INTERVAL = 4_000;

const WeatherWidget = ({ toggle, setToggle, isChecked, setIsChecked }) => {
  const [city, setCity] = useState("Cracow");
  const ref = useRef();
  useToggleOnOutsideClick(ref, toggle, setToggle);

  const cityUrl = `/city?${city}`;

  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
    invalidate,
  } = useFetch(url + cityUrl);
  const {
    data: cityData,
    loading: loadingCity,
    error: errorCity,
  } = useFetch(url + citiesListUrl);

  const intervalId = useRef(null);
  const clearFetchInterval = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  useEffect(() => {
    if (isChecked) {
      intervalId.current = setInterval(() => {
        invalidate();
      }, REVALIDATE_INTERVAL);
    } else if (intervalId.current) {
      clearFetchInterval();
    }
  }, [isChecked, invalidate]);

  useEffect(() => {
    // onmount
    return () => {
      // onunmount
      if (intervalId.current) {
        clearFetchInterval();
      }
    };
  }, []);

  const handleSubmitCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmitCheckbox = () => {
    console.log("checkbox", !isChecked);
  };

  const onChangeCheckbox = () => {
    updateCheckbox(database, "1", !isChecked)
      .then(() => {
        setIsChecked((prevState) => !prevState);
      })
      .catch(() => console.warn());
  };
  // render

  if (weatherLoading) {
    return <p>loading...</p>;
  }

  if (weatherError) {
    return <p>error</p>;
  }

  const fixedInitialWeatherData = fixTemperatureDisplay(
    weatherData.temperature
  );

  return (
    <div ref={ref} className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <div className={styles.info}>
            <h4>{city}</h4>
            <h4>
              {fixedInitialWeatherData}
              &deg;
            </h4>
          </div>
          <div className={styles.icons}>
            {typeof weatherData?.precipitation === "number" && (
              <DisplayWeatherIcons
                weatherPrecipitation={weatherData.precipitation}
              />
            )}
          </div>
        </div>
        {!loadingCity && !weatherError && !errorCity && (
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
                onChange={() => onChangeCheckbox()}
                checked={isChecked}
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
