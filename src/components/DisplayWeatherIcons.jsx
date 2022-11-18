import React from "react";
import { ReactComponent as Sunny } from "../assets/day-sunny.svg";
import { ReactComponent as Rain } from "../assets/rain.svg";

const DisplayWeatherIcons = ({ weatherDataPre, intervalPre, checkbox }) => {
  const rainTreshold = 0.7;
  return (
    <>
      {checkbox ? (
        intervalPre < rainTreshold ? (
          <Sunny />
        ) : (
          <Rain />
        )
      ) : weatherDataPre < rainTreshold ? (
        <Sunny />
      ) : (
        <Rain />
      )}
    </>
  );
};

export default DisplayWeatherIcons;
