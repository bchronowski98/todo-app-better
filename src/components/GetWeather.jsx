import React, { forwardRef, useState, useEffect, useRef } from "react";
import styles from "./GetWeather.module.scss";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";
import useFetch from "../hooks/useFetch.js";

const url = "https://live-weather.deno.dev";
const getCities = "/get-cities";
const rainTreshold = 0.7;

const GetWeather = forwardRef(({ toggle, toggleWeather }, ref) => {
  const [city, setCity] = useState("Cracow");
  const [checkbox, setCheckbox] = useState(false);
  const interval = useRef(null);
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
  } = useFetch(url + getCities);
  const [loading, setLoading] = useState(loadingWeather);
  const [error, setError] = useState(errorWeather);
  const [generalWeather, setGeneralWeather] = useState(null);

  // console.log(cities);

  useEffect(() => {
    if (checkbox) {
      interval.current = setInterval(() => {
        const loadData = async () => {
          try {
            const res = await fetch(url + cityUrl);
            const data = await res.json();
            setGeneralWeather(data);
            setLoading(false);
            console.log(data);
          } catch (e) {
            setError(e);
            setLoading(false);
          }
        };
        loadData();
      }, 30000);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
    return () => clearInterval(interval.current);
  }, [checkbox, city]);

  useEffect(() => {
    setGeneralWeather(null);
  }, [city]);

  const handleSubmitCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmitCheckbox = () => {
    console.log("checkbox", !checkbox);
  };

  if (loadingWeather) {
    return <p>loading...</p>;
  }

  if (errorWeather) {
    return <p>error</p>;
  }

  return (
    <div ref={ref} className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <div className={styles.info}>
            <h4>{city}</h4>
            <h4>
              {Number.parseFloat(
                generalWeather
                  ? generalWeather.temperature
                  : weatherData.temperature
              ).toFixed(1)}
              &deg;
            </h4>
          </div>
          <div className={styles.icons}>
            {generalWeather ? (
              generalWeather.precipitation < rainTreshold ? (
                <Sunny />
              ) : (
                <Rain />
              )
            ) : weatherData.precipitation < rainTreshold ? (
              <Sunny />
            ) : (
              <Rain />
            )}
          </div>
          {/*{toggle && (*/}
          {/*  <button type="button" onClick={toggleWeather}>*/}
          {/*    <XSign />*/}
          {/*  </button>*/}
          {/*)}*/}
        </div>
        {!loadingCity && !errorWeather && (
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
});

export default GetWeather;
