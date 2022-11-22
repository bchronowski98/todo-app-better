import React from "react";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";

const DisplayWeatherIcons = ({
  InitialWeatherPrecipitation,
  // revalidatedPrecipitation,
  // checkbox,
}) => {
  const rainTreshold = 0.7;
  if (InitialWeatherPrecipitation < rainTreshold) {
    return <Sunny />;
  }
  return <Rain />;
};

export default DisplayWeatherIcons;
