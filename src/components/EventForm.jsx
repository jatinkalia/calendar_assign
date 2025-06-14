import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EventForm = ({ date, event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = 'Title is required';
    }

    if (startTime && endTime && startTime >= endTime) {
      validationErrors.time = 'End time must be after start time';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEvent = {
      id: event?.id || Date.now(),
      title,
      description,
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime
    };

    onSave(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2 className="text-xl font-bold mb-4">
        {event ? 'Edit Event' : 'Add Event'} for {format(date, 'MMMM d, yyyy')}
      </h2>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      {errors.time && <p className="text-red-500 text-sm mb-4">{errors.time}</p>}
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;