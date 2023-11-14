import React from "react";
import { formatToLocalTime } from "../utils/helperFunctions";

export default function TimeAndLocation(
  {weather}
  ) {

  return (
    <div>
      <div className="flex items-center justify-around my-6">
        <p className="text-white text-xl font-extralight">
          { formatToLocalTime(weather.dt, weather.timezone) }

        </p>
      </div>

      <div className="flex items-center justify-around my-3">
        <p className="text-white text-3xl font-medium">
          { weather.name }, {weather.sys.country}
        </p>
      </div>
    </div>

  );
}