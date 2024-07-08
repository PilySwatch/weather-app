import TopButtons from './TopButtons';
import Inputs from './Inputs';
import TimeAndLocation from './TimeAndLocation';
import TemperatureAndDetails from './TemperatureAndDetails';

export default function Weather({ setCity, units, setUnits, weather }) {
  return (
    <div className={`border-2 border-slate-100 border-opacity-5 rounded-2xl max-w-md w-full ml-4 py-4 px-5 bg-gradient-to-br h-[736.5px] sm:max-w-lg sm:h-[736.5px] md:max-w-xl md:h-[736.5px] shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-2xl`}>
        <div className="flex flex-col items-center justify-center py-3">
            <img src={require('../nimbus.png')} alt='logo' className='w-14 sm:w-16 md:w-20' />
            <h1 className='text-2xl font-medium text-white underline sm:text-3xl md:text-4xl underline-offset-8'>NimbusCast</h1>
        </div>
        <TopButtons setCity={setCity} />
        <Inputs setCity={setCity} setUnits={setUnits}/>

        { weather && ( 
            <div>
                <TimeAndLocation weather={weather} />
                <TemperatureAndDetails weather={weather} units={units} />
            </div>
        )}
    </div>
  )
}

