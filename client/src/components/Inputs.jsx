import { React, useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';


export default function Inputs(
  {setCity}
  ) {
   const [cityName, setCityName] = useState('');

  const handleSearchClick = () => {
    if (cityName !== '') {
      setCity(cityName);
      setCityName('');
    }
  }

  return (
    <div className='flex flex-row justify-center my-6'>

      <div className='flex flex-row w-3/4 items-center justify-center space-x-0'>
        <input 
        value={cityName}
        onChange={(e) => setCityName(e.currentTarget.value)}
        type='text' 
        placeholder='Search for city...'
        className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        
        <div className='bg-gray-700 p-2.5' >
          <UilSearch 
          size={25} 
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
          />
        </div>
      </div>

    </div>

  );
}