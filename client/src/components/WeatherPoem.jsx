import React, { useState } from 'react';
import { UilAngleLeft, UilAngleRight, UilAngleDoubleLeft, UilAngleDoubleRight } from '@iconscout/react-unicons';

export default function WeatherPoem({ title, author, lines, keyword }) {
  const [currentPage, setCurrentPage] = useState(1);
  const linesPerPage = 10;

  const startIdx = (currentPage - 1) * linesPerPage;
  const endIdx = startIdx + linesPerPage;
  const visibleLines = lines.slice(startIdx, endIdx);
  const totalPages = Math.ceil(lines.length / linesPerPage);

  const highlightKeyword = (phrase) => {
    const regex = new RegExp(`\\b(${keyword})`, 'gi');
    const parts = phrase.split(regex);
    return parts.map((part, index) => (
      regex.test(part) ? <span className='font-semibold text-decoration-line: underline' key={index}>{part}</span> : part
    ));
  };

  
  const handlePaginationClick = (action) => {
    switch (action) {
      case 'first':
        setCurrentPage(1);
        break;
      case 'back':
        setCurrentPage(Math.max(currentPage - 1, 1));
        break;
      case 'next':
        setCurrentPage(Math.min(currentPage + 1, totalPages));
        break;
      case 'last':
        setCurrentPage(totalPages);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white text-xl uppercase'>Weather Poem</p>
      </div>
      <hr className='my-2'/>

      <div className='max-w-md mx-auto my-4 p-4 bg-opacity-100 bg-white shadow-xl'>
        <p className='text-gray-500 text-xl font-medium'>{title}</p>
        <p className='text-gray-500 text-l font-medium mb-4 pb-2'>{`— by ${author}`}</p>
        <p className='text-gray-700 italic text-medium font-light'>
          {visibleLines.map((line, index) => (
            <React.Fragment key={index}>
              {highlightKeyword(line)}
              {index < visibleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {lines.length > linesPerPage && (
          <div className='mt-4'>
            <hr className='my-2 border-gray-300'/>
            <div className='flex items-center justify-center px-3 text-white'>
              <button
                className='bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('first')}
              >
                <UilAngleDoubleLeft />
              </button>
              <br />
              <button
                className='bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('back')}
              >
                <UilAngleLeft />
              </button>
              <br />
              <span className='text-gray-700 mx-1'>
                Page {currentPage} of {totalPages}
              </span>
              <br />
              <button
                className='bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('next')}
              >
                <UilAngleRight />
              </button>
              <br />
              <button
                className='bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('last')}
              >
                <UilAngleDoubleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


