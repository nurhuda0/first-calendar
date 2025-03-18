import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=gVKjanJQyilwNbaU01KmHcC78rn9lNMi&country=US&year=${date.getFullYear()}`);
      const data = await response.json();
      setHolidays(data.response.holidays);
    };

    fetchHolidays();
  }, [date]);

  return (
    <div className="p-4">
      <Calendar onChange={setDate} value={date} />
      <p className="mt-4">Selected Date: {date.toDateString()}</p>
      <h2 className="mt-4 text-lg font-bold">Holidays:</h2>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.id} className="mt-2">
            {holiday.name} - {holiday.date.iso}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;