import React from "react";

export default function TimeAndLocation(
  {weather}
  ) {

  return (
    <div>
      <div className="flex items-center justify-around my-6">
        <p className="text-xl text-white font-extralight">
          {weather.localTime}

        </p>
      </div>

      <div className="flex items-center justify-around my-3">
        <p className="text-3xl font-medium text-white">
          { weather.name }, {weather.sys.country}
        </p>
      </div>
    </div>

  );
}