import React from "react";
import useFetch from "../hooks/useFetch.js";

const IntervalData = ({
  url,
  cityUrl,
  fixedWeatherData,
  getIntervalWeatherPre,
}) => {
  const headers = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  };
  const {
    data: intervalWeather,
    loading: intervalLoading,
    error: intervalError,
  } = useFetch(url + cityUrl, true, 4, headers);

  if (intervalLoading) {
    return <p>loading...</p>;
  }

  if (intervalError) {
    return <p>error</p>;
  }

  const fixedIntervalWeather = Number.parseFloat(
    intervalWeather.temperature
  ).toFixed(1);

  getIntervalWeatherPre(intervalWeather.precipitation);

  return <>{intervalWeather ? fixedIntervalWeather : fixedWeatherData}</>;
};

export default IntervalData;
