import React, { useState } from "react";
import { UilAngleLeft, UilAngleRight, UilAngleDoubleLeft, UilAngleDoubleRight } from '@iconscout/react-unicons';

export default function WeatherPoem({ title, author, lines, keyword }) {
  const [currentPage, setCurrentPage] = useState(1);
  const linesPerPage = 10; // poem total lines per page - total lines that the user sees at once

  const startIdx = (currentPage - 1) * linesPerPage; // define starting index of the lines for the current page. Page 1: lines 0 to 9; Page 2: 10 to 19, ...
  const endIdx = startIdx + linesPerPage; // define ending index of the lines for the current page
  const visibleLines = lines.slice(startIdx, endIdx);
  /*
  This logic is part of the pagination mechanism. It ensures that you display a subset of lines corresponding to the current page. For example, if there are 30 lines in total and linesPerPage is set to 10, then:
  - On page 1, startIdx is 0, and visibleLines will be lines 0 to 9.
  - On page 2, startIdx is 10, and visibleLines will be lines 10 to 19.
  - On page 3, startIdx is 20, and visibleLines will be lines 20 to 29.
  This way, the component displays a portion of the poem based on the current page, allowing the user to navigate through the content.
   */

  const totalPages = Math.ceil(lines.length / linesPerPage); // total number of pages

  // function to highligh the keyword that matched the weather description
  const highlightKeyword = (phrase) => {
    // TODO: improve keyword search to avoid regex to mack words like: "skyscraper" if keyword = sky but still to take into account plurals or -ing endings
    const regex = new RegExp(`\\b(${keyword})`, 'gi'); // "\\b" is an achor - word boundary. In this regex search, it ignores words like "train" or "brain" if the keyword = "rain"
    const parts = phrase.split(regex);

    return parts.map((part, index) => (
      regex.test(part) ? <span className="font-semibold text-decoration-line: underline" key={index}>{part}</span> : part
    ));
  };

  // handle condition for Pagination buttons
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
      <div className="flex items-center justify-start mt-6">
        <p className="text-white text-xl uppercase">Weather Poem</p>
      </div>
      <hr className="my-2"/>

      <div className="max-w-md mx-auto my-4 p-4 bg-opacity-100 bg-white shadow-xl">
        <p className="text-gray-500 text-xl font-medium">{title}</p>
        <p className="text-gray-500 text-l font-medium mb-4 pb-2">{`— by ${author}`}</p>
        <p className="text-gray-700 italic text-medium font-light">
          {visibleLines.map((line, index) => (
            <React.Fragment key={index}>
              {highlightKeyword(line)}
              {index < visibleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        {lines.length > linesPerPage && (
          <div className="mt-4">
            <hr className="my-2 border-gray-300"/>
            <div className="flex items-center justify-center px-3 text-white">
              <button
                className="bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none"
                onClick={() => handlePaginationClick('first')}
              >
                <UilAngleDoubleLeft />
              </button>
              <br />
              <button
                className="bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none"
                onClick={() => handlePaginationClick('back')}
              >
                <UilAngleLeft />
              </button>
              <br />
              <span className="text-gray-700 mx-1">
                Page {currentPage} of {totalPages}
              </span>
              <br />
              <button
                className="bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none"
                onClick={() => handlePaginationClick('next')}
              >
                <UilAngleRight />
              </button>
              <br />
              <button
                className="bg-gray-700 px-3 py-3 mx-1 rounded-full focus:outline-none"
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


