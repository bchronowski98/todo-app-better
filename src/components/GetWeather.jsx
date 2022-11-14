import React, { useRef } from "react";
import styles from "./GetWeather.module.scss";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";
import { ReactComponent as XSign } from "../assets/x-sign.svg";
import useFetch from "../hooks/useFetch.js";
import useToggleOnOutsideClick from "../hooks/useToggleOnOutsideClick.jsx";

const url = "https://live-weather.deno.dev";
const cracowWeather = "/city?Cracow";
const rainTreshold = 0.7;

const GetWeather = ({ toggle, setToggle, toggleWeather }) => {
  const { data, loading, error } = useFetch(url + cracowWeather);
  const ref = useRef();
  useToggleOnOutsideClick(ref, toggle, setToggle);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div ref={ref} className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.card}>
        <div className={styles.info}>
          <h4>Krakow</h4>
          <h4>{Number.parseFloat(data.temperature).toFixed(1)}&deg;</h4>
        </div>
        <div className={styles.icons}>
          {data.precipitation > rainTreshold ? <Sunny /> : <Rain />}
        </div>
        {toggle && (
          <button type="button" onClick={toggleWeather}>
            <XSign />
          </button>
        )}
      </div>
    </div>
  );
};

export default GetWeather;
