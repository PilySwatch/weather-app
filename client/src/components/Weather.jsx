import TopButtons from './TopButtons';
import Inputs from './Inputs';
import TimeAndLocation from './TimeAndLocation';
import TemperatureAndDetails from './TemperatureAndDetails';

export default function Weather({ setCity, units, setUnits, weather }) {
  return (
    <div className={`border-2 border-slate-100 border-opacity-5 rounded-2xl mx-auto max-w-screen-md mt-4 py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br h-fit shadow-xl shadow-black/40 backdrop-blur-xl`}>
            <div className="flex flex-col items-center justify-center py-3">
                <img src={require('../nimbus.png')} alt='logo' className='w-14 sm:w-16 md:w-20' />
                <h1 className='text-2xl font-medium text-white underline sm:text-3xl md:text-4xl underline-offset-8'>NimbusCast</h1>
            </div>
            <TopButtons setCity={setCity} />
            <Inputs setCity={setCity} units={units} setUnits={setUnits}/>

            { weather && ( 
                // && poemData 
                <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} units={units} />
                    {/* <WeatherPoem {...poemData} keyword={(weather.weather[0].description.split(' ')[1] || 'weather')}/>  */}
                </div>
            )}

        </div>
  )
}
