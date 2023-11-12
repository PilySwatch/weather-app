import React, {useState} from "react";
import { UilAngleDown, UilAngleUp } from '@iconscout/react-unicons';

export default function WeatherPoem({ title, author, lines }) {

  const [expanded, setExpanded] = useState(false);
  const visibleLines = expanded ? lines : lines.slice(0, 5);


  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white text-xl uppercase"> Weather Poem</p>
      </div>
      <hr className="my-2"/>
      
      <div className="max-w-2xl mx-auto my-4 p-4 bg-opacity-100 bg-white shadow-xl">
        <p className="text-gray-500 text-xl font-medium">{title}</p>
        <p className="text-gray-500 text-l font-medium mb-4 pb-2">{`— by ${author}`}</p>
        <p className="text-gray-700 italic text-medium font-light">
            {visibleLines.map((line, index) => (
                <React.Fragment key={index}>
                    {line.split(',').map((phrase, phraseIndex, array) => (
                        <React.Fragment key={phraseIndex}>
                            {phrase.trim()}
                            {phraseIndex < array.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                    {index < visibleLines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </p>
        {lines.length > 5 && (
          <div className="mt-2"> {/* Add margin between the poem and the button */}
              <hr className="my-2 border-gray-300"/>
              <button
                  className="bg-gray-700 px-3 py-3 rounded-full focus:outline-none"
                  onClick={() => setExpanded(!expanded)}
              >
                  {expanded ? <UilAngleUp 
                  size={25}
                  className="text-white transition ease-out hover:scale-125" 
                  /> : <UilAngleDown 
                  size={25}
                  className="text-white transition ease-out hover:scale-125"  
                  />}
              </button>
          </div>
        )}
      </div>

    </div>


  );
}