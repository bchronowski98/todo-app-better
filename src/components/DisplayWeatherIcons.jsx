import React from "react";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";

const DisplayWeatherIcons = ({ weatherPrecipitation }) => {
  const rainTreshold = 0.7;
  if (weatherPrecipitation < rainTreshold) {
    return <Sunny />;
  }
  return <Rain />;
};

export default DisplayWeatherIcons;
