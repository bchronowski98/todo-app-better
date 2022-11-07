import React, { useState, useEffect } from "react";
import styles from "./GetWeather.module.scss";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";
import { ReactComponent as XSign } from "../assets/x-sign.svg";
import useFetch from "../hooks/useFetch.js";

const url = "https://live-weather.deno.dev";
const cracowWeather = "/city?Cracow";
const rainTreshold = 0.7;

const GetWeather = ({ toggle, toggleWeather }) => {
  const { data, loading, error } = useFetch(url + cracowWeather);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div className={`${styles.main} ${toggle ? "" : styles.toggled}`}>
      <div className={styles.card}>
        <div className={styles.info}>
          <h4>Krakow</h4>
          <h4>{Math.round(data.temperature * 10) / 10}&deg;</h4>
        </div>
        <div className={styles.icons}>
          {data.precipitation > rainTreshold ? <Sunny /> : <Rain />}
        </div>
        {toggle && (
          <button onClick={toggleWeather}>
            <XSign />
          </button>
        )}
      </div>
    </div>
  );
};

export default GetWeather;
