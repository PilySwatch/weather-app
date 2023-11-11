import React from "react";

export default function TopButtons(
  {setCity}
  ) {

  const cities = [
    {
      id:1,
      title: 'London',
      country_code: 'GB'
    },
    {
      id:2,
      title: 'Sydney',
      country_code: 'AU'
    },
    {
      id:3,
      title: 'Tokyo',
      country_code:'JP'
    },
    {
      id:4,
      title: 'Toronto',
      country_code: 'CA'
    },
    {
      id:5,
      title: 'Paris',
      country_code: 'FR'
    },
  ]

  // TODO: add text-decoration underline when hover and selecting city


  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium" 
        onClick={() => setCity(city.title)}
        >{city.title}</button>
      ))}
    </div>

  );
}