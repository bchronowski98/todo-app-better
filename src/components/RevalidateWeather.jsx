import React from "react";
import useFetch from "../hooks/useFetch.js";
import { fixTemperatureDisplay } from "../utils/formatData.js";

const RevalidateWeather = ({
  url,
  cityUrl,
  fixedInitialWeatherData,
  getRevalidatedPrecipitation,
}) => {
  const headers = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  };
  const {
    data: revalidatedWeather,
    loading: revalidatedLoading,
    error: revalidatedError,
  } = useFetch(url + cityUrl, true, 4, headers);

  if (revalidatedLoading) {
    return <p>loading...</p>;
  }

  if (revalidatedError) {
    return <p>error</p>;
  }

  const fixedRevalidatedWeather = fixTemperatureDisplay(
    revalidatedWeather.temperature
  );

  getRevalidatedPrecipitation(revalidatedWeather.precipitation);

  return (
    <>
      {revalidatedWeather ? fixedRevalidatedWeather : fixedInitialWeatherData}
    </>
  );
};

export default RevalidateWeather;
