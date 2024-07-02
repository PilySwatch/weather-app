export default function TimeAndLocation({weather}) {

  return (
    <div>
      <div className="flex items-center justify-around my-6">
        <p className="text-xl text-white font-extralight">
          {weather.local_time}

        </p>
      </div>

      <div className="flex items-center justify-around my-3">
        <p className="text-3xl font-medium text-white">
          { weather.city_name }, {weather.country}
        </p>
      </div>
    </div>

  );
}