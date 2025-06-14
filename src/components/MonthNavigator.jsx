import React from 'react';
import { format } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MonthNavigator = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrevMonth}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaChevronLeft />
      </button>
      <h2 className="text-xl font-bold">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <button
        onClick={onNextMonth}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MonthNavigator;