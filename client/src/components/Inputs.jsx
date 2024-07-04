import { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';

export default function Inputs({setCity}) {
  const [cityName, setCityName] = useState('');

  const handleSearchClick = () => {
    if (cityName !== '') {
      setCity(cityName);
      setCityName('');
    }
  }

  return (
    <div className='flex flex-row justify-center my-6'>

      <div className='flex flex-row items-center justify-center w-3/4 space-x-0'>
        <input 
        value={cityName}
        onChange={(e) => setCityName(e.currentTarget.value)}
        type='text' 
        placeholder='Search for city...'
        className='w-full p-2.5 font-light capitalize shadow-xl text-md focus:outline-none placeholder:lowercase'
        />
        
        <div className='bg-gray-700 p-2.5' >
          <UilSearch 
          size={25} 
          className='text-white transition ease-out cursor-pointer hover:scale-125'
          onClick={handleSearchClick}
          />
        </div>
      </div>

    </div>

  );
}