import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function Inputs({setCity, setUnits}) {
  const [cityName, setCityName] = useState('');

  const handleSearchClick = () => {
    if (cityName !== '') {
      setCity(cityName);
      setCityName('');
    }
  }

  return (
    <div className='flex flex-row justify-center px-4 my-6 ml-6'>

      <div className='flex flex-row items-center justify-center w-3/5'>
        <input 
        value={cityName}
        onChange={(e) => setCityName(e.currentTarget.value)}
        type='text' 
        placeholder='Search by city...'
        className='w-full p-2.5 font-light capitalize shadow-xl text-md focus:outline-none placeholder:lowercase'
        />
        
        <div className='bg-gray-700 p-2.5' >
          <BiSearch 
          size={25} 
          className='text-white transition ease-out cursor-pointer hover:scale-125'
          onClick={handleSearchClick}
          />
        </div>
      </div>
      
      <div className='flex flex-row items-center justify-center w-1/5'>
        <button
          className='text-xl text-white transition ease-out cursor-pointer hover:scale-125'
          onClick={()=>setUnits('metric')}
        >ºC</button>
        
        <p className='mx-1 text-white'> | </p>
        
        <button
          className='text-xl text-white transition ease-out cursor-pointer hover:scale-125'
          onClick={()=>setUnits('imperial')}
        >ºF</button>
      </div>

    </div>

  );
}