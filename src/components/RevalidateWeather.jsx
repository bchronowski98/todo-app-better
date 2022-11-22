import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { fixTemperatureDisplay } from "../utils/formatData.js";

const RevalidateWeather = ({
  url,
  cityUrl,
  fixedInitialWeatherData,
  setRevalidatedPrecipitation,
  checkbox,
}) => {
  const {
    data: revalidatedWeather,
    loading: revalidatedLoading,
    error: revalidatedError,
    invalidate: revalidateData,
  } = useFetch(url + cityUrl);

  useEffect(() => {
    if (checkbox) {
      const revalidateInterval = setInterval(() => {
        revalidateData();
      }, 4000);

      return () => clearInterval(revalidateInterval);
    }
  }, [url]);

  if (revalidatedLoading) {
    return <p>loading...</p>;
  }

  if (revalidatedError) {
    return <p>error</p>;
  }

  const fixedRevalidatedWeather = fixTemperatureDisplay(
    revalidatedWeather.temperature
  );

  //blad za pierwszym renderem ale nie wiem jak go usunac!?!
  setRevalidatedPrecipitation(revalidatedWeather.precipitation);

  return (
    <>
      {revalidatedWeather ? fixedRevalidatedWeather : fixedInitialWeatherData}
    </>
  );
};

export default RevalidateWeather;
