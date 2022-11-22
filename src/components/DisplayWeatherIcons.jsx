import React from "react";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";

const DisplayWeatherIcons = ({
  InitialWeatherPrecipitation,
  revalidatedPrecipitation,
  checkbox,
}) => {
  const rainTreshold = 0.7;
  return (
    <>
      {checkbox ? (
        revalidatedPrecipitation < rainTreshold ? (
          <Sunny />
        ) : (
          <Rain />
        )
      ) : InitialWeatherPrecipitation < rainTreshold ? (
        <Sunny />
      ) : (
        <Rain />
      )}
    </>
  );
};

export default DisplayWeatherIcons;
