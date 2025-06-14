import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import MonthNavigator from './MonthNavigator';
import EventForm from './EventForm';
import EventList from './EventList';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowEventList(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
    setShowEventList(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
    setShowEventList(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = (event) => {
    if (selectedEvent) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, event]);
    }
    setShowEventForm(false);
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  const renderCalendarDays = () => {
    const startDay = monthStart.getDay();
    const emptyDays = Array(startDay).fill(null);

    return (
      <>
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day.toString()}
              className={`calendar-day ${isSameDay(day, new Date()) ? 'current-day' : ''} ${isSameMonth(day, currentMonth) ? '' : 'other-month'}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="day-number">{format(day, 'd')}</div>
              {dayEvents.length > 0 && (
                <div className="event-indicator">
                  {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="calendar-container">
      <MonthNavigator
        currentMonth={currentMonth}
        onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
        onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
      />
      
      <div className="calendar-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {showEventForm && (
        <div className="modal">
          <div className="modal-content">
            <EventForm
              date={selectedDate}
              event={selectedEvent}
              onSave={handleSaveEvent}
              onCancel={() => setShowEventForm(false)}
            />
          </div>
        </div>
      )}

      {showEventList && (
        <div className="modal">
          <div className="modal-content">
            <EventList
              date={selectedDate}
              events={getEventsForDate(selectedDate)}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onClose={() => setShowEventList(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;