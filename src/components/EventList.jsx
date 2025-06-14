import React from 'react';
import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EventList = ({ date, events, onAddEvent, onEditEvent, onDeleteEvent, onClose }) => {
  return (
    <div className="event-list">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Events for {format(date, 'MMMM d, yyyy')}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      
      {events.length === 0 ? (
        <p className="text-gray-500 mb-4">No events scheduled for this day.</p>
      ) : (
        <ul className="mb-4">
          {events.map(event => (
            <li key={event.id} className="mb-2 p-2 border rounded hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  {event.description && <p className="text-sm text-gray-600">{event.description}</p>}
                  {(event.startTime || event.endTime) && (
                    <p className="text-sm text-gray-500">
                      {event.startTime} - {event.endTime}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditEvent(event)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <button
        onClick={onAddEvent}
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Event
      </button>
    </div>
  );
};

export default EventList;