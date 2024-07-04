import React, { useState } from 'react';
import { UilAngleLeft, UilAngleRight, UilAngleDoubleLeft, UilAngleDoubleRight } from '@iconscout/react-unicons';

export default function WeatherPoem({ poemData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const linesPerPage = 5;
  
  if (!poemData) {
    return <div>Loading...</div>;
  }
  
  const startIdx = (currentPage - 1) * linesPerPage;
  const endIdx = startIdx + linesPerPage;
  const visibleLines = poemData.lines.slice(startIdx, endIdx);
  const totalPages = Math.ceil(poemData.lines.length / linesPerPage);
  
  const highlightKeyword = (phrase) => {
    const regex = new RegExp(`\\b(${poemData.keyword})`, 'gi');
    const parts = phrase.split(regex);
    return parts.map((part, index) => (
      regex.test(part) ? <span className='font-semibold underline' key={index}>{part}</span> : part
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
    <div className='border-2 border-slate-100 border-opacity-5 rounded-2xl mx-2 my-2 py-4 px-4 bg-gradient-to-br shadow-[0_3px_10px_rgb(0,0,0,0.5)] backdrop-blur-3xl w-full sm:max-w-lg'>
      <div className='flex items-center justify-start'>
        <p className='font-medium text-white uppercase'>Weather Poem</p>
      </div>
      <hr className='my-2' />
      <div className='flex flex-col justify-center'>
        <div className='pl-2'>
          <div className='flex items-end justify-start mb-2'>
            <p className='mt-2 mr-2 text-xl font-medium text-white'>{poemData.title}</p>
            <p className='font-normal text-white'>{`— by ${poemData.author}`}</p>
          </div>
          <p className='mb-2 italic font-light text-white text-medium'>
            {visibleLines.map((line, index) => (
              <React.Fragment key={index}>
                {highlightKeyword(line)}
                {index < visibleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
        {poemData.lines.length > linesPerPage && (
          <div className='mt-2'>
            <hr className='my-2 border-gray-300'/>
            <div className='flex items-center justify-center px-3 text-white'>
              <button
                className='p-2 mx-1 bg-gray-700 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('first')}
              >
                <UilAngleDoubleLeft />
              </button>
              <button
                className='p-2 mx-1 bg-gray-700 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('back')}
              >
                <UilAngleLeft />
              </button>
              <span className='mx-1 text-sm text-white'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='p-2 mx-1 bg-gray-700 rounded-full focus:outline-none'
                onClick={() => handlePaginationClick('next')}
              >
                <UilAngleRight />
              </button>
              <button
                className='p-2 mx-1 bg-gray-700 rounded-full -2 focus:outline-none'
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

