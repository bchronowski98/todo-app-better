import React, { useState, useEffect } from "react";
import styles from "./GetWeather.module.scss";
import Sunny from "../assets/day-sunny.svg";
import Rain from "../assets/rain.svg";

const GetWeather = ({ toggle, toggleWeather }) => {
  const url = "https://live-weather.deno.dev/city?Cracow";
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
          <h4>{Math.round(data.temperature)}&deg;</h4>
        </div>
        <div className={styles.icons}>
          {data.precipitation > 0.7 ? (
            <img src={Rain} alt="rain" />
          ) : (
            <img src={Sunny} alt="sunny" />
          )}
        </div>
        {toggle && <button onClick={toggleWeather}>X</button>}
      </div>
    </div>
  );
};

export default GetWeather;
